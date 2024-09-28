const tableRowsWrapper = document.getElementById("tableRowsWrapper");
const incomeInputForm = document.getElementById("incomeInputForm");


let tableRowElements = [];
let dropdownTypesArr = ["Annually", "Biannually", "Quarterly", "Monthly", "Biweekly", "Weekly", "Daily", "Onetime"]; // For the dropdown elements

const incomeLabelInput = document.getElementById("incomeLabelInput");
const incomeTypeInput = document.getElementById("incomeTypeInput");
const incomeAmountInput = document.getElementById("incomeAmountInput");

incomeInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Row div, is a grid
    const tableRow = document.createElement("div");
    tableRow.classList.add("table-row-wrapper");
    tableRowsWrapper.appendChild(tableRow);

    // Trash can
    const deleteRowButtonGridItem = document.createElement("button");
    deleteRowButtonGridItem.classList.add("grid-item");
    const trashImage = document.createElement("img");
    trashImage.classList.add("trash-icon-image");
    trashImage.src = "../../resources/ionicons/trash-outline.svg"
    deleteRowButtonGridItem.appendChild(trashImage);

    deleteRowButtonGridItem.addEventListener("click", (e) => {
        tableRow.remove();
    });
    tableRow.appendChild(deleteRowButtonGridItem);

    // Label Text Input
    const textInputGridItem = document.createElement("input");
    textInputGridItem.classList.add("grid-item");
    textInputGridItem.value = incomeAmountInput.value;
    tableRow.appendChild(textInputGridItem);

    // Type Dropdown
    const incomeTypesDropdownGridItem = document.createElement("select");
    incomeTypesDropdownGridItem.classList.add("grid-item");
    for(let i = 0; i < dropdownTypesArr.length; i++){
        let option = document.createElement("option");
        option.textContent = dropdownTypesArr[i];
        option.value = dropdownTypesArr[i];
        incomeTypesDropdownGridItem.appendChild(option);
    }
    incomeTypesDropdownGridItem.value = incomeTypeInput.value;
    tableRow.appendChild(incomeTypesDropdownGridItem);

    // Amount Number Input
    const numberInputGridItem = document.createElement("input");
    numberInputGridItem.classList.add("grid-item");
    numberInputGridItem.value = incomeAmountInput.value;
    tableRow.appendChild(numberInputGridItem);

    tableRowElements.push(tableRow);
});

function returnAllVals() {
    //for(let i = 0; i < )
}