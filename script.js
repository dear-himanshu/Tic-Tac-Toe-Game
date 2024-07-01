let grid_box = document.querySelector(".sub_layout");

let matrix_grid_col_o = [0,0,0];
let matrix_grid_col_x = [0,0,0];

let matrix_grid_row_o = [0,0,0];
let matrix_grid_row_x = [0,0,0];

let diagonal_1_o = [0,0,0];
let diagonal_1_x = [0,0,0];

let diagonal_2_o = [0,0,0];
let diagonal_2_x = [0,0,0];

let flag = 0 ; 

let draw = 0 ;

for(let i=0; i<9 ;i++){
    let sub_box = document.createElement("div");
    grid_box.appendChild(sub_box);
    sub_box.classList.add(`grid_box${i}`);
    sub_box.id = `${i}`;
    sub_box.classList.add(`${i}`);
    sub_box.classList.add("grid_box");
    sub_box.style.border = "5px solid black";
}


let action_btn = Array.from(document.querySelectorAll(".grid_box"));


const visualiser = (mat,con,player) => {
    flag = 1; 

    let index = mat.indexOf(3);

    if(con==="l"){
        action_btn.forEach(item => {
            if(item.id%3 === Math.floor(item.id/3)){
                item.style.backgroundColor = "#77FF90";
            }

        });
    }
    else if(con==="r"){
        action_btn.forEach(item => {
            if((item.id%3 + Math.floor(item.id/3)) === 2){
                item.style.backgroundColor = "#77FF90";
    
            }
        });
    }
    else if(con==="col"){
        action_btn.forEach(item => {
            if(item.id%3===index){
                item.style.backgroundColor = "#77FF90";
            }
        });
        
    }
    else if(con==="row"){
        action_btn.forEach(item => {
            if(Math.floor(item.id/3)===index){
                item.style.backgroundColor = "#77FF90";
            }
        });

    }

    let result = document.querySelector(".result");
    if(player === "d")
        result.innerHTML = `<p>It's a Draw</p>`;
    else
        result.innerHTML = `<p>${player} wins!</p>`;
    
}

const checkWin = () => {
    // if(matrix_grid_col_o.includes(3) || matrix_grid_row_o.includes(3) || diagonal_1_o.every(val => val === 1) || diagonal_2_o.every(val => val === 1))
    //     console.log("o wins");
    // if(matrix_grid_col_x.includes(3) || matrix_grid_row_x.includes(3) || diagonal_1_x.every(val => val === 1) || diagonal_2_x.every(val => val === 1))
    //     console.log("x wins");
    if (matrix_grid_col_x.includes(3)) {
        visualiser(matrix_grid_col_x,"col","X");
    } else if (matrix_grid_row_x.includes(3)) {
        visualiser(matrix_grid_row_x,"row","X");

    } else if (diagonal_1_x.every(val => val === 1)) {
        visualiser(diagonal_1_x,"l","X");

    } else if (diagonal_2_x.every(val => val === 1)) {
        visualiser(diagonal_2_x,"r","X");

    } else if (matrix_grid_col_o.includes(3)) {
        visualiser(matrix_grid_col_o,"col","O");

    } else if (matrix_grid_row_o.includes(3)) {
        visualiser(matrix_grid_row_o,"row","O");

    } else if (diagonal_1_o.every(val => val === 1)) {
        visualiser(diagonal_1_o,"l","O");

    } else if (diagonal_2_o.every(val => val === 1)) {
        visualiser(diagonal_2_o,"r","O");
    } 
    else if(draw===9){
        // console.log("draw");
        visualiser(diagonal_2_o,"d","d");
    }
 

};



let gstatus = "x";

action_btn.forEach(item =>{

    
    item.addEventListener("click", (event)=>{
        // window.alert("h");
        if(flag===0){
            ++draw;
        
        if(gstatus === "x"){
            item.innerHTML = "<span class='material-symbols-outlined'>close</span>";
            matrix_grid_col_x[item.id%3]+=1  ; 
            matrix_grid_row_x[Math.floor(item.id/3)]+=1  ;
            
            if(item.id%3 === Math.floor(item.id/3)) 
                diagonal_1_x[item.id%3]=1 ; //left diagonal 
            
            if((item.id%3 + Math.floor(item.id/3)) === 2) 
                diagonal_2_x[Math.floor(item.id/3)]=1 ; //right diagonal 


        }
        else{
            item.innerHTML = "<span class='material-symbols-outlined'>circle</span>";
            matrix_grid_col_o[item.id%3]+=1 ; 
            matrix_grid_row_o[Math.floor(item.id/3)]+=1 ; 
            if(item.id%3 === Math.floor(item.id/3)) 
                diagonal_1_o[item.id%3]=1 ; //left diagonal 
            
            if((item.id%3 + Math.floor(item.id/3)) === 2) 
                diagonal_2_o[Math.floor(item.id/3)]=1 ; //right diagonal 

        }

        gstatus = gstatus === "x" ? "o" : "x" ; 
        // console.log(`o:${matrix_grid_row_o}${matrix_grid_col_o}${diagonal_1_o}${diagonal_2_o}`);
        // console.log(`x:${matrix_grid_row_x}${matrix_grid_col_x}${diagonal_1_x}${diagonal_2_x}`);
        
        // item.innerHTML = "<span class='material-symbols-outlined'>circle</span>";

        // item.innerHTML = "<span class='material-symbols-outlined'>close</span>";

        checkWin()
    } //flag is 0 here
           
    }, {once : true});

    

   
});

let res = document.querySelector(".reset_btn");

res.addEventListener("click", ()=>{
    location.reload();
    // localStorage.clear();
    // sessionStorage.clear();
});