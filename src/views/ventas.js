var tb = document.getElementById("info");
var fil=0,col=0;
var op=false;
function agregar(){
    var producto = document.getElementById("Producto").value; 
    var precio = document.getElementById("Precio").value;
    var cantidad = document.getElementById("Cantidad").value;
    if (verificar(producto)) {
        resultado()
        op=false;
    }else{
        var nada = tb.rows.length;
        var row = tb.insertRow(nada);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML=producto;
        cell2.innerHTML=precio;
        cell3.innerHTML=cantidad;
        cell4.innerHTML=cantidad*precio;
        alert("Producto agregado")
        resultado()
    }
}

function verificar(p){
    for(var i=0; i<tb.rows.length; i++){
        if (tb.rows[i].cells[0].innerHTML==p) {
            op=true;
            fil=i;col=0;
        }
    }
    return op;
}

function resultado(){
    var sum = 0
    for(var i = 1; i<tb.rows.length; i++){
        sum = sum +parseFloat(tb.rows[i].cells[3].innerHTML)
    }
    document.getElementById("SubTotal").value=sum;
    document.getElementById("IGV").value=(sum*0.18).toFixed(2)
    document.getElementById("Total").value=(sum+sum*0.18).toFixed(2)
}
