function print_fibonacci_sequence(){
    num1 = 0;
    num2 = 1;
    nextTerm = num1 + num2;
    console.log(num1);
    console.log(num2);

    for(let i = 3; i <= 10; i++){
        console.log(nextTerm);
        num1 = num2;
        num2 = nextTerm;
        nextTerm = num1 + num2;
    }
}

print_fibonacci_sequence();


