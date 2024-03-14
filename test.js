const arr = [
    {title: "cde", description: "dfasfa", editMode: true},
    {title: "cde", description: "dfasfa", editMode: true},
    {title: "cde", description: "dfasfa", editMode: true},
    {title: "cde", description: "dfasfa", editMode: true},
];

const newArr = arr.map((item, index) => {
    const { editMode, ...rest } = item;
  
    // Your additional checking and functions here
    if (index === 1) {
      return {
        title : "Hi",
        description : "Hello",
      }
    }
  
    return rest;
  });

console.log(newArr);