package types

import (
	"context"
	"encoding/json"
	"fmt"

	inventory "github.com/swinarga/tf2outpost-mock/inventoryservice/genproto"
)

type Response struct {
	Result Result `json:"result"`
}

type Result struct {
	Status           int     `json:"status"`
	NumBackpackSlots uint32  `json:"num_backpack_slots"`
	Items            []*Item `json:"items"`
}

type Item struct {
	Id                int          `json:"id"`
	OriginalId        int          `json:"original_id"`
	Defindex          int          `json:"defindex"`
	Level             int          `json:"level"`
	Quality           int          `json:"quality"`
	Inventory         int          `json:"inventory"` // not really important
	Quantity          int          `json:"quantity"`
	Origin            int          `json:"origin"`
	CustomName        *string      `json:"custom_name,omitempty"`
	CustomDescription *string      `json:"custom_desc,omitempty"`
	FlagCannotTrade   bool         `json:"flag_cannot_trade"`
	FlagCannotCraft   bool         `json:"flag_cannot_craft"`
	Attributes        []*Attribute `json:"attributes"`
}

type Attribute struct {
	Defindex   int         `json:"defindex"`
	Value      IntOrString `json:"value"` // value can be int or string
	FloatValue float64     `json:"float_value"`
}

type IntOrString struct {
	IntValue    int
	StringValue string
	IsInt       bool
}

type Inventory struct {
	SteamId          uint64
	NumBackpackSlots uint32
	Items            []*inventory.Item
}

func (ios *IntOrString) UnmarshalJSON(data []byte) error {
	// Try to unmarshal data into an int
	var intValue int
	if err := json.Unmarshal(data, &intValue); err == nil {
		ios.IntValue = intValue
		ios.IsInt = true
		return nil
	}

	// If it fails, try to unmarshal data into a string
	var stringValue string
	if err := json.Unmarshal(data, &stringValue); err == nil {
		ios.StringValue = stringValue
		ios.IsInt = false
		return nil
	}

	return fmt.Errorf("value is neither int nor string")
}

// service interface for the gRPC server
type InventoryService interface {
	GetInventory(ctx context.Context, id uint64) (*Inventory, error)
}
