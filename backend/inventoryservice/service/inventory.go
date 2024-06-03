package service

import (
	"context"
	"fmt"
	"log"

	"github.com/swinarga/tf2outpost-mock/inventoryservice/client"
	inventory "github.com/swinarga/tf2outpost-mock/inventoryservice/genproto"
	"github.com/swinarga/tf2outpost-mock/inventoryservice/types"
)

type InventoryService struct {
	client *client.SteamAPIClient
}

func NewInventoryService() *InventoryService {
	return &InventoryService{
		client: client.NewSteamAPIClient(),
	}
}

func (s *InventoryService) GetInventory(ctx context.Context, id uint64) (*types.Inventory, error) {
	// call steam inventory service
	log.Println("GetInventory called with id: ", id)
	inv, err := s.client.GetInventory(id)
	// fmt.Printf("service/inventory.go - status: %d\n", inv.Status)

	// l := len(inv.Items)
	// if l > 100 {
	// 	l = 50
	// }
	// for i := 0; i < l; i++ {
	// 	fmt.Printf("Item Original ID: %d\n", inv.Items[i].OriginalId)
	// 	fmt.Printf("Defindex: %d\n", inv.Items[i].Defindex)
	// 	fmt.Printf("Quality: %d\n", inv.Items[i].Quality)
	// 	fmt.Println("------------------------------")

	// }

	if err != nil {
		return &types.Inventory{}, err
	}

	// if status is not 1, return empty items
	if inv.Status != 1 {
		fmt.Printf("Error, status: %d\n", inv.Status)
		return &types.Inventory{}, nil
	}

	fmt.Printf("inv.Items length: %d\n", len(inv.Items))

	// convert to types.Inventory
	items := make([]*inventory.Item, len(inv.Items))
	// fmt.Printf("items length: %d\n", len(items))
	// fmt.Printf("items cap: %d\n", cap(items))

	for itemIndex, item := range inv.Items {
		i := &inventory.Item{
			Id:                uint64(item.Id),
			OriginalId:        uint64(item.OriginalId),
			Defindex:          uint32(item.Defindex),
			Level:             uint32(item.Level),
			Quality:           uint32(item.Quality),
			Quantity:          uint32(item.Quantity),
			CustomName:        item.CustomName,
			CustomDescription: item.CustomDescription,
			IsTradable:        !item.FlagCannotTrade,
			IsCraftable:       !item.FlagCannotCraft,
		}

		if len(item.Attributes) > 0 {
			i.Attributes = make([]*inventory.Attribute, len(item.Attributes))
			for attrIndex, attr := range item.Attributes {
				var a *inventory.Attribute
				if attr.Value.IsInt {
					a = &inventory.Attribute{
						Defindex:   uint32(attr.Defindex),
						ValueInt:   int64(attr.Value.IntValue),
						IsInt:      true,
						FloatValue: attr.FloatValue,
					}
				} else {
					// There are some attributes that are ommitted
					a = &inventory.Attribute{
						Defindex:    uint32(attr.Defindex),
						ValueString: attr.Value.StringValue,
						IsInt:       false,
						FloatValue:  attr.FloatValue,
					}
					// fmt.Printf("Attribute: %v\n", a)

				}
				i.Attributes[attrIndex] = a

			}
		}
		items[itemIndex] = i
	}

	return &types.Inventory{
		SteamId:          id,
		NumBackpackSlots: inv.NumBackpackSlots,
		Items:            items,
	}, nil
}
