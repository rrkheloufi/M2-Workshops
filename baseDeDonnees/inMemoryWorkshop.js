/*global inMemoryWorkshop:true, module:true*/
inMemoryWorkshop = []

function getWorkshopList() {
  return new Promise((resolve, ) => {
    resolve(inMemoryWorkshop)
  })
}

// function getWorkshopByName(name) {
//   return new Promise((resolve, reject) => {
//     if (!name) {
//       reject(new Error("name parameter is required"))
//     }
//     resolve(inMemoryWorkshop.find(workshop => workshop.name === workshop))
//   })
// }

function getWorkshopById(id) {
  return new Promise((resolve, reject) => {
    if(id > inMemoryWorkshop.length || id < 0){
      reject(new Error("Not valid id"))
    }
    resolve(inMemoryWorkshop[id])
  })
}


function addWorkshop(name, description) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error("Workshop name required"))
    }
    if (!description) {
      reject(new Error("Workshop description required"))
    }
    inMemoryWorkshop.push({
      name,
      description
    })
    resolve()
  })
}

// function removeWorkshopByName(name) {
//     return new Promise((resolve, reject) => {
//         reject(new Error("Not implemented"))
//     })
// }

function removeWorkshopById(id) {
  return new Promise((resolve, reject) => {
    if(id > inMemoryWorkshop.length || id < 0){
      reject(new Error("Not valid id"))
    }
    inMemoryWorkshop.splice(id, 1)
    resolve()
  })
}


function updateWorkshop(id, name, description) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error("Workshop name required"))
    }
    if (!description) {
      reject(new Error("Workshop description required"))
    }
    inMemoryWorkshop[id] = {name, description}
    resolve()
  })
}

module.exports = {
  getWorkshopList,
  getWorkshopById,
  addWorkshop,
  removeWorkshopById,
  updateWorkshop
}
