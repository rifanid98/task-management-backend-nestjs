package main

import "fmt"

func main() {
	/** style 1 */
	const firstName1 = "Adnin Rifandi"
	const lastName1 = "Sutanto Putra"

	/** style 2 */
	const (
		firstName2 = "Adnin Rifandi"
		lastName2  = "Sutanto Putra"
	)

	fmt.Println(firstName1 + " " + lastName1)
	fmt.Println(firstName2 + " " + lastName2)
}
