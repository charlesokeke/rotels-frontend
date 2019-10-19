export  const options = [
  { value: "Restaurants", label: "Restaurants" },
  { value: "Asian restaurants", label: "Asian restaurants" },
  { value: "Chinese restaurants", label: "Chinese restaurants" },
  { value: "Mexican restaurants", label: "Mexican restaurants" },
  { value: "Greek restaurants", label: "Greek restaurants" },
  { value: "Pizza restaurants", label: "Pizza restaurants" },
  { value: "African restaurants", label: "African restaurants" },
  { value: "Indian restaurants", label: "Indian restaurants" },
  { value: "Sushi restaurants", label: "Sushi restaurants" },
  { value: "Bar and Grill restaurants", label: "Bar and Grill restaurants" },
  { value: "Japanese restaurants", label: "Japanese restaurants" },
  { value: "Meditaranian restaurants", label: "Meditaranian restaurants" },
  { value: "Breakfast restaurants", label: "Breakfast restaurants" },
  { value: "Dinner restaurants", label: "Dinner restaurants" },
  { value: "Arab restaurants", label: "Arab restaurants" },
  { value: "Fast foods restaurants", label: "Fast foods restaurants" },
  { value: "Barbeque ribs restaurants", label: "Barbeque ribs restaurants" },
  { value: "Soul foods restaurants", label: "Soul foods restaurants" },
  { value: "Italian restaurants", label: "Italian restaurants" }
];

export function persistModalElementValue (){
    var accumulator = ''
    return function (value){
        accumulator+=value
        return accumulator
    }
}