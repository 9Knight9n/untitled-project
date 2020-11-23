export const encodeList=(list,selected)=>{
    
    let result = "";
    for(let k=0;k<list.length;k++)
    {
        result += "0";
    }
    if (!selected){
        return result   
    }
    // console.log(result)
    for(let i = 0;i<selected.length;i++)
    {
        const condition = (element) => element.value === selected[i].value;
        let index = list.findIndex(condition)
        // console.log( selected[i] ," index is ",index)
        result = result.substring(0, index) + '1' + result.substring(index + 1);
    }
    return result;
}
export const decodeList=(list,selected)=>{
    let result = [];
    for(let k=0;k<list.length;k++)
    {
        if(selected.charAt(k)==='1')
            result.push(list[k])
    }
    return result;
    // console.log(result)
}
export const getUserInfo=()=>{
    Cookies.set("1:username","sajad")
    sessionStorage.setItem("1:avatar","data:image/png;base64,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")
}