import {Tabulator} from 'https://unpkg.com/tabulator-tables@6.2.5/dist/js/tabulator_esm.min.mjs';


var table = new Tabulator("#incomeDisplayTable", {
    columns:[
        {title:"Name", field:"name", sorter:"string", width:200, editor:true},
        {title:"Age", field:"age", sorter:"number", hozAlign:"right", formatter:"progress"},
        {title:"Gender", field:"gender", sorter:"string", cellClick:function(e, cell){console.log("cell click")},},
        {title:"Height", field:"height", formatter:"star", hozAlign:"center", width:100},
        {title:"Favourite Color", field:"col", sorter:"string"},
        {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        {title:"Cheese Preference", field:"cheese", sorter:"boolean", hozAlign:"center", formatter:"tickCross"},
    ],
});
var tabledata = [

];


console.log("big mammi");
console.log("your mom");