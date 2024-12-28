const n=100;
const arr=[];
init();
function init(){
for(let i=0;i<n;i++){
    arr[i]=Math.random();
}
showbars()
}
function play(){
    const copy=[...arr];//copy of original array
    const moves=bubblesort(copy);
    animate(moves);
}
function play1(){
    const copy=[...arr];//copy of original array
    const moves=selectionsort(copy);
    animate(moves);
}
function play2(){
    const copy=[...arr];//copy of original array
    const moves=insertionsort(copy);
    animate(moves);
}
function play3(){
    const copy=[...arr];//copy of original array
    const moves=mergesort(copy);
    animate(moves);
}
function play4(){
    const copy=[...arr];//copy of original array
    const moves=quicksort(copy);
    animate(moves);
}
function animate(moves){
    if(moves.length==0){
        showbars();
        return;
    }
    const move=moves.shift();//to show the steps
    const[i,j]=move.indices;
    if(move.type=="swap"){
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    }
    else if (move.type == "overwrite") {
        arr[i] = move.value; // Overwrite the value during merge
    }
    showbars(move);
    setTimeout(function(){
        animate(moves);
    },0.1);


}
function bubblesort(arr){
    const moves=[];//to access moves happening in array
for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-i-1;j++){
        moves.push({indices:[j,j+1],type:"comp"});
        if(arr[j]>arr[j+1]){
            moves.push({indices:[j,j+1],type:"swap"});//to make the swapping array
            let temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
        }
    }
}
return moves;
}
function selectionsort(arr){
    const moves=[];
for(let i=0;i<arr.length-1;i++){
    smallest=i;
for(let j=i+1;j<arr.length;j++){
    moves.push({indices:[smallest,j],type:"comp"});
    if(arr[smallest]>arr[j]){
       
        smallest=j;
    }
}
moves.push({indices:[smallest,i],type:"swap"});
let temp=arr[smallest];
arr[smallest]=arr[i];
arr[i]=temp;
}
return moves;
}
function insertionsort(arr){
    const moves=[];
    for(let i=1;i<arr.length;i++){
  let current=arr[i];
  let prev=i-1;
 
while(prev>=0){
    moves.push({indices:[prev,i],type:"comp"});
    if(arr[prev]>current){

arr[prev+1]=arr[prev];//jab tak element bada h current se usko ek position aage khiska do
moves.push({indices:[prev+1,prev],type:"swap"});
prev--;}
else{
    break;
}
}

arr[prev+1]=current;

    }
    return moves;
}
function merge(arr,si,mid,ei,moves){
    
   let temp=new Array(ei-si+1);
     let i=si;//left array ko traverse krne ko
    let j=mid+1;//right array ...
    let k=0;//new temp array...
 
    while(i<=mid && j<=ei){
        moves.push({indices:[i,j],type:"comp"});
        if(arr[i]<arr[j]){//agar ith elemnt chota h jth se toh temp array mein voh pehle aaega
            temp[k]=arr[i];
            moves.push({ indices: [si + k], type: "overwrite",value:arr[i]});
           
            i++;
        
        }
        else{
            temp[k]=arr[j];
            moves.push({ indices: [si + k], type: "overwrite",value:arr[j]});
            j++;
        
        }
    k++;
    }
        while(i<=mid){//abhi bhi elements bach gaye toh
temp[k]=arr[i];//assiging and incrementing
moves.push({ indices: [si + k], type: "overwrite", value: arr[i] });
i++;
k++;
}
        while(j<=ei){//abhi bhi elements bach gaye toh
            temp[k]=arr[j];//assiging and incrementing
            moves.push({ indices: [si + k], type: "overwrite",value:arr[j]});
            j++;
            k++;
                     }
                     //copying elemnts fron temp to array
        for(k=0,i=si;k<temp.length;k++,i++){
arr[i]=temp[k];
moves.push({ indices: [i], type: "overwrite", value: temp[k] });


        }
    
       
       
        
    
}
 function mergeSort(arr,si,ei,moves){
      
    if(si>=ei){
        return;
    }
    let mid=Math.floor(si+(ei-si)/2);
    mergeSort(arr, si, mid,moves);//left array
    mergeSort(arr,mid+1,ei,moves);//right array
    merge(arr,si,mid,ei,moves);
}

function mergesort(arr){
    const moves=[];
    mergeSort(arr,0,arr.length-1,moves);
    return moves;
}



   function partition(arr,si,ei,moves){
        let pivot=arr[ei];
        let i=si-1;//thiss will make place for elements whcih are less than pivot
        for(let j=si;j<ei;j++){
            moves.push({indices:[j,ei],type:"comp"});
            if(arr[j]<=pivot){
               
                i++;//jagah banao sabse pehle
                //swap arr[i],arr[j]
                moves.push({indices:[i,j],type:"swap"});
                let temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
       
            }
           
        }
         //make place for pivot also at last
         i++;//jagah banao sabse pehle
         moves.push({indices:[i,ei],type:"swap"});
         let temp=pivot;
         arr[ei]=arr[i];//arr[ei] hi aaega pivot nhi...call by reference logic se..change array k reflect hote h variable k nhi
         arr[i]=temp;
         return i;
    }
    function quickSort(arr,si,ei,moves){
        if(si>=ei){//ek hi element bacha h
            return;
        }
        let pidx=partition(arr,si,ei,moves);//pivot element ka index aaega
        quickSort(arr,si,pidx-1,moves);//pivot element to aa gaya sahi index pe..usse pehle aur baad waalo ko sort krna h
        quickSort(arr,pidx+1,ei,moves);
    }
    function quicksort(arr){
        const moves=[];
        quickSort(arr,0,arr.length-1,moves);
        return moves;
       
    }


function showbars(move){
    container.innerHTML="";//to remove previous bars (unsorted) while showing the new sorted bars
for(let i=0;i<arr.length;i++){
    const bar=document.createElement("div");
    bar.style.height=arr[i]*100+"%";
    bar.classList.add("bar");
    if(move && move.indices.includes(i)){//the current bar which is being swapped uska color red
        bar.style.backgroundColor=
        move.type=="swap"?"red":"blue";//red if swap hai toh nhi toh blue
       
    }
    container.appendChild(bar);
}
}