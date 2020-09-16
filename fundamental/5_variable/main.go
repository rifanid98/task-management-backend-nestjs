package main

import "fmt"

func main() {
	// style 1
	var name string
	name = "Adnin"
	fmt.Println(name)

	// style 2
	var age = 22
	fmt.Println("My name is "+name+" and my age is ", age)

	// style 3
	address := "Kp. sinagar RT. 03/07"
	fmt.Println("My address is at ", address)

	// style 4, multiple variable
	var (
		newName    string = "New Name" // style 1
		newAge            = 0          // style 2
		newAddress        = "New Address"
	)
	fmt.Println("New Name ", newName)
	fmt.Println("New Age ", newAge)
	fmt.Println("New Address ", newAddress)
}
