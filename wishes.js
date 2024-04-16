// let wishes = [
//     {
//         id:1,
//         item : "iphone 12",
//         price : '900e',
//         link : 'http/kfjdkab.com',
//         important : false,
//         source : "olx"
//     },
//     {
//         id:2,
//         item : "Macbook Air",
//         price : '1900e',
//         link : 'http/kfjdkab.com',
//         important : true,
//         source : "KP"
//     }
// ]

let wishes = [];
if(localStorage.db){
    wishes = JSON.parse(localStorage.db);
}

localStorage.db = JSON.stringify(wishes);
