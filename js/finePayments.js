let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");  
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine"); 
  
let DB = data.finesData;
 
buttonSubmit.addEventListener("click", payFine);

function payFine() {
  const fineNumberValue = fineNumber.value;
  const passportValue = passport.value;
  const creditCardNumberValue = creditCardNumber.value;
  const cvvValue = cvv.value;
  const amountValue = amount.value;
   
  // Пошук штрафу за номером
  const foundFine = DB.find((fine) => fine.номер === fineNumberValue);
    
  // Валідація полів:
  //Номер штрафу
  if (!foundFine) { 
    alert("Штраф з введеним номером не знайдений.");  
    return;
  }
  //Зпівпадінн сумми з номером штрафу
  if (foundFine.сума !== parseFloat(amountValue)) {
    alert("Сума не співпадає з існуючим штрафом.");
    return;
  }
    //Паспортний номер
  if (!/^[А-ЩЬЮЯІЇЄҐ]{2}\d{6}$/.test(passportValue)) {
    alert("Не вірний паспортний номер.");
    return;
}
  //Кредитна картка
  if (!/^\d{16}$/.test(creditCardNumberValue)) {
    alert("Не вірна кредитна картка.");
    return;
  }
  //CVV код
  if (!/^\d{3}$/.test(cvvValue)) {
    alert("Не вірний CVV.");
    return;
  }
    
  // Видалення об'єкта з DB
  const indexToRemove = DB.findIndex((fine) => fine.номер === fineNumberValue);
  DB.splice(indexToRemove, 1);
  alert("Штраф успішно оплачено та видалено з бази даних.");
}
