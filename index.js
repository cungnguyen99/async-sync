//Từ khóa let: chỉ có tác dụng trong 2 dấu { }
/**
 *  từ khóa var: ta có thể khai báo biến b ở trong phần if và ra ngoài vẫn sd biến b được và k báo lỗi 
 */
var a=5;
if(a==5){
    var b=4;
}
console.log(b)
/**
 * Từ khóa let: ta khai báo biến c ở trong 2 dấu {} của if thì nó chỉ có thể sd được trong nội bộ
 * 2 dấu { } của if còn nếu ra ngoài ta console.log như biến b ở trên sẽ báo lỗi
 */
if(true){
    let c=5
}
//Biến c không được sử dụng ở bên ngoài này do khai báo là let
// console.log(c)

//Arrow function()
let arr=[3,4,5,6,8]
arr.forEach(function(e){
    console.log(e)
})

//Dùng arrow ta thay chữ function bằng =>
arr.forEach((e)=>{
    console.log(e)
})
//Nếu có 1 biến ta có thể bỏ () ở chỗ khai báo biến đi
arr.forEach(e=>{
    console.log(e)
})
//Nếu có 1 câu lệnh ta có thể bỏ {} ở chỗ body của function
arr.forEach(e=>console.log(e))
//dấu => thay cho luôn là từ khóa return 
//đáng lẽ: map(e=> return e*2) nhưng do => thay cho từ khóa return nên phải bỏ đi
var newArr=arr.map(e=>e*2)
console.log(newArr)
//Với 1 hàm ta khai báo như này
let add=function(a,b){
    return a+b
}
//Ta có thể làm như sau:
let sum=(a,b)=>a+b
console.log(sum(4,5))
/*
 *========> Cấu trúc chung của 1 arrow function let name_function=()=>{}
 */

/*****************PROMISE******************/
let div=(a,b)=>{
    return new Promise((resolve,reject)=>{
        //nếu có lỗi thì gọi reject khi đó kq trong reject sẽ được trả về trong cacth để thực hiện tiếp
        if(b===0){
            reject(new Error('b phải khác 0'))
        }else{
            //không có lỗi thì gọi resolve, khi đó kết quả trong resolve sẽ được trả về trong then
            //tức là khi không có lỗi thì resolve sẽ thực hiện a/b ra 1 kq rồi kq đó sẽ được trả về trong
            //then để then muốn làm gì thì làm, trong bài này then dùng kq để in ra 
            resolve(a/b)
        }
        // resolve(a/b)
    })
}
div(9,0)
.then(reponse=>{
    console.log(reponse)
})
.catch(err=>{
    //dùng dấu + mà k phải dấu , để cho nó đỡ phải in ra 1 đống, thử thay sẽ biết
    console.log("Kết quả trong reject: " + err)
})

//readFile
let fs=require('fs');
var dataFile=(path=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf8',(err,data)=>{
            if(err){
                reject(new Error('Lỗi'))
            }else{
                resolve(data)
            }
        })
    })
})
dataFile('text.txt')
.then(reponse=>{
    console.log(reponse)
})
/**********************Bài 8: Promise liên tiếp**********************/
//Bài toán tính: (a+b)+c
let addNumber=(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a!='number'){
            reject(new Error('a phải là một số'))
        }
        resolve(a+b);
    })
}
addNumber(5,8)
.then(reponse1=>add(reponse1,9))//do reponse1 là kết quả trả về từ promise dòng 102 nên ta sẽ lấy kết quả đó + 9 luôn mà không in ra như những bài trước
.then(reponse2=>console.log("Kết quả của 5+8+9="+reponse2))//bây giờ then này thực hiện promise ở dòng 103, và ta lấy kết quả của phép tính đó in ra 
.catch(err=>console.log(err+' '))

//Tính diện tích hình thang
let mul=(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a!='number'){
            reject(new Error('a phải là một số'))
        }
        resolve(a*b);
    })
}
let divide=(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a!='number'){
            reject(new Error('a phải là một số'))
        }
        resolve(a/b);
    })
}
let area=(a,b,h)=>{
    return addNumber(a,b)
           .then(res=>mul(res,h))
           .then(result=>divide(result,2))
        //     Ta có thể làm ngay như bên dưới để in ra kq và lỗi nhưng trong thực tế khi ta xử lý các promise
        //     ta sẽ gửi về cho ng dùng hoặc server nên ta sẽ return ra kq đó và làm việc với nó ở ngoài
        //     Khi ta return như trên thì vốn nó sẽ trả về 1 promise do các hàm trong đó đều trả về 1 promise
        //    .then(kq=>console.log("kq=",kq))
        //    .catch(err=>console.log(err+' '))
}
area(5,6,7)
.then(res=>console.log('Dien tich hinh thang ',res))
.catch(err=>console.log(err+''))