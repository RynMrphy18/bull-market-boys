async function validate(search){
    // loop through the characters in the string
    for(let i=0; i<search.length; i++){
        let char = search.charAt(i);
        // test is character is within a-z
        if(!/^[a-zA-Z]+$/.test(char)){
            return false;
        }
    }
    return true;
}

module.exports = validate;