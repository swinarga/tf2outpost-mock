package client

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"

	"github.com/swinarga/tf2outpost-mock/inventoryservice/types"
)

var STEAM_INV_URL string = "http://api.steampowered.com/IEconItems_440/GetPlayerItems/v0001/"

type SteamAPIClient struct {
	SteamKey string
}

func NewSteamAPIClient() *SteamAPIClient {
	return &SteamAPIClient{SteamKey: os.Getenv("STEAM_API_KEY")}
}

func MockGetInventoryResponse() ([]byte, error) {
	// Open our jsonFile
	jsonFile, err := os.Open("client/example_inventories/hohinso.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("Successfully Opened %s\n", "client/example_inventories/hohinso.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := io.ReadAll(jsonFile)

	if err != nil {
		log.Fatalf("Error: %v", err)
		return nil, err
	}

	return byteValue, nil

}

func (c *SteamAPIClient) GetInventory(id uint64) (*types.Result, error) {
	// MAKE REQUEST
	params := url.Values{}
	params.Add("steamId", strconv.FormatUint(id, 10))
	params.Add("key", c.SteamKey)
	params.Add("format", "json")
	p_encoded := params.Encode()
	fmt.Printf("Params: %s\n", p_encoded)

	requestURL := fmt.Sprintf(STEAM_INV_URL+"?%s", p_encoded)
	fmt.Printf("Request URL: %s\n", requestURL)

	res, err := http.Get(requestURL)

	byteValue, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("client: could not read response body: %s\n", err)
		return &types.Result{}, err
	}
	// Close the response body
	defer res.Body.Close()
	// byteValue, _ := MockGetInventoryResponse()

	var response *types.Response
	if err := json.Unmarshal(byteValue, &response); err != nil {
		fmt.Println(err)
		return &types.Result{}, err
	}

	if response.Result.Status != 1 {
		fmt.Printf("Error, status: %d\n", response.Result.Status)
		return &response.Result, errors.New("Error, status: " + strconv.Itoa(response.Result.Status))

	}

	// fmt.Printf("Response status: %d\n", response.Result.Status)

	l := len(response.Result.Items)
	fmt.Printf("response.Result.Items length: %d\n", l)
	// if l > 100 {
	// 	l = 50
	// }

	// for i := 0; i < l; i++ {
	// 	fmt.Printf("Item Original ID: %d\n", response.Result.Items[i].OriginalId)
	// 	fmt.Printf("Defindex: %d\n", response.Result.Items[i].Defindex)
	// 	fmt.Printf("Quality: %d\n", response.Result.Items[i].Quality)
	// 	fmt.Printf("Attribute isValueInt: %t", response.Result.Items[i].Attributes[0].Value.IsInt)
	// 	fmt.Println("------------------------------")

	// }

	// fmt.Printf("client: response body: %s\n", res)

	return &response.Result, nil
}

func readJSON(path string) {
	// Open our jsonFile
	jsonFile, err := os.Open(path)
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("Successfully Opened %s\n", path)
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := io.ReadAll(jsonFile)

	var response types.Response

	if err := json.Unmarshal(byteValue, &response); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Printf("Response status: %d\n", response.Result.Status)
	fmt.Printf("Response status: %d\n", response.Result.NumBackpackSlots)
	fmt.Println("------------------------------")

	for i := 0; i < len(response.Result.Items); i++ {
		fmt.Printf("Item Original ID: %d\n", response.Result.Items[i].OriginalId)
		fmt.Printf("Defindex: %d\n", response.Result.Items[i].Defindex)
		fmt.Printf("Quality: %d\n", response.Result.Items[i].Quality)
		fmt.Println("------------------------------")

	}

	return
}

// func main() {
// 	err := godotenv.Load(".env")

// 	if err != nil {
// 		log.Fatalf("Error loading .env file")
// 	}

// 	readJSON("client/example_inventories/hohinso.json")
// }
