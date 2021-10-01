let items = [
  // { id: 8, seqId: 3, parent: 6, name: "ProductController" }, /*checking if code supports additional objects on array*/
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" }
];

const transformItems = (arr) => {
  let newItems = []
  const getDepth = (parentId) => {
    let member = items.filter(elm => elm.id === parentId)
    // check if the member is not undefined value in the firstplace
    let doesMemberExist = typeof member[0] !== 'undefined'
    return (doesMemberExist)? 1 + getDepth(member[0].parent): 0;
  } 

  arr.forEach(elm => {
    elm.depth = (elm.parent !== null) ? getDepth(elm.parent): 0;
    if(elm.parent == null){
      newItems.push(elm)
    } else {
      for(let i = 0; i < arr.length; i++){
        if (arr[i].id === elm.parent) {
          arr[i].children = arr[i].children || [];
          arr[i].children.push(elm);
          arr[i].children.sort((a,b)=> a.seqId - b.seqId)
          break;
          newItems.push(arr[i])
        }
      }
    }
  })

  function extractChildren (arr, newArray=[]) {
    if (arr.length == 0 ) return newArray;

    arr.forEach(elm => {
      if(!Array.isArray(elm.children) && !Array.isArray(elm)){
        newArray.push(elm)
      } 
      if(Array.isArray(elm.children)){
        elm.children.sort((a,b)=> a.seqId - b.seqId)
        newArray.push(elm)
        extractChildren(elm.children, newArray)
        delete elm.children
      }
    })
    return newArray
  }
   return extractChildren(newItems)
 
}


const finalItems = transformItems(items);

/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/

console.log(finalItems);


/* Output:
// The seqId is used for ordering within siblings.
// The depth would depend on the number of ancestors.
[
  { id: 1, seqId: 1, parent: null, depth: 0, name: 'components' },
  { id: 5, seqId: 2, parent: 1, depth: 1, name: 'AssignmentTable' },
  { id: 2, seqId: 4, parent: 5, depth: 2, name: 'index.tsx' },
  { id: 7, seqId: 5, parent: 5, depth: 2, name: 'SelectableDropdown.tsx' },
  { id: 3, seqId: 3, parent: 1, depth: 1, name: 'Sidebar' },
  { id: 4, seqId: 5, parent: 1, depth: 1, name: 'Table' },
  { id: 6, seqId: 2, parent: null, depth: 0, name: 'controllers' }
]
*/

