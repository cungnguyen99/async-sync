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
            reject(new Error('a phải là một số +'))
        }
        resolve(a+b);
    })
}
addNumber(5,8)
.then(reponse1=>add(reponse1,9))//do reponse1 là kết quả trả về từ promise dòng 102 nên ta sẽ lấy kết quả đó + 9 luôn mà không in ra như những bài trước
.then(reponse2=>console.log("Kết quả của 5+8+9="+reponse2))//bây giờ then này thực hiện promise ở dòng 103, và ta lấy kết quả của phép tính đó in ra 
.catch(err=>console.log(err+' '))

//Tính các phép cộng và in ra
addNumber(4,5)//promise đầu tiên trả về kq res trong then dòng 108
.then(res=>{
    console.log('res dòng 110',res)//log ra kq của promise dòng 108
    return addNumber(6,7)//ở đây return ra 1 promise nữa và nó trả về kq ở then dòng 113
})
.then(res=>{
    console.log('then dòng 115',res)//log ra kq ở promise dòng 111
    return addNumber(6,8)//return ra 1 promise nữa 
})
.then(res=>console.log('then dòng 117',res))
//Tính diện tích hình thang
let mul=(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a!='number'){
            reject(new Error('a phải là một số *'))
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

/************************Bài 11: Phương thức all và race*********************/
//Promise.all trả về 1 mảng các promise và nếu có lỗi ở reject nào thì nó sẽ gọi vào reject của promise đó, nếu có nhiều promise bị reject thì nó sẽ gọi lỗi của promise bị reject trước tiên
Promise.all([addNumber(4,5),mul(4,5)])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))
Promise.all([addNumber("4",5),mul(4,"5")])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))//sẽ chạy vào lỗi của promise bị lỗi đầu tiên

//promise all làm bài tính 1 loạt phép toán
Promise.all([addNumber(4,5),addNumber(7,8),addNumber(3,5)])
.then(res=>console.log('then dòng 160',res))
.catch(err=>console.log(err))
//Promise.race truyền vào 1 mảng các promise nhưng chỉ trả về kết quả của promise đầu tiên kể cả promise đầu tiên lỗi hay không lỗi vẫn trả về. lỗi thì trả về lỗi, có kết quả thì trả về kq
Promise.race([addNumber(4,5),mul(4,5)])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))
//trả về reject của promise đầu tiên
Promise.race([addNumber("4",5),mul(4,5)])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))
//trả về resolve của promise đầu tiên
Promise.race([addNumber(4,5),mul("4",5)])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))


/*******************Bài 13: Làm quen với async – await**********************/
let as=async ()=>{
    /**
     * lúc đầu k có await thì n trả về 1 promise đang ở trạng thái pending 
     * có nghĩa dòng 182 chưa chạy xong thì n đã chạy đến dòng 183 
     * nhưng khi cho await vào thì n sẽ đợi cho chạy xong dòng 183 
     * đợi n trả về kq cho sum rồi mới chạy tiếp đến dòng 184
     */
    let sum=await addNumber(4,5)
    console.log("kq dong 179",sum)
}
as();
/*******************Bài 14: Sử dụng await liên tiếp**********************/
let tinhdientich=async (a,b,h)=>{
    let ab=await addNumber(a,b);
    let abh=await mul(ab,h);
    let square= await div(abh,2);
    console.log("kq dong 193",square);
}
tinhdientich(4,5,6)

//Nhưng vì async khong có then hay catch nên ta không thể hender lỗi thì ta phải try catch nó để khi có lỗi n không xuất ra 1 đống dòng mà chỉ ra dòng lỗi mà ta đã viết trong reject thôi
let tinhDT=async (a,b,h)=>{
    try {
        let ab=await addNumber(a,b);
        let abh=await mul(ab,h);
        let square= await div(abh,2);
        console.log("kq dong 203",square);
    } catch (error) {
        console.log('lỗi dòng 205 '+error)
    }

}
tinhDT(4,"5",56)