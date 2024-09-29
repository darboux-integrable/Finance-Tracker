const tableRowsWrapper = document.getElementById("tableRowsWrapper");
const incomeInputForm = document.getElementById("incomeInputForm");
const tableRowsBackgroundWrapper = document.getElementById("tableRowsBackgroundWrapper");

let tableRowElements = [];
let dropdownTypesArr = ["Annually", "Biannually", "Quarterly", "Monthly", "Biweekly", "Weekly", "Daily", "Onetime"]; // For the dropdown elements
let tableRowBackgroundElements = [];

const incomeLabelInput = document.getElementById("incomeLabelInput");
const incomeTypeInput = document.getElementById("incomeTypeInput");
const incomeAmountInput = document.getElementById("incomeAmountInput");

incomeInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Creating row background
    const tableRowBackground = document.createElement("div");
    tableRowBackground.classList.add("table-row-background");
    if(tableRowBackgroundElements.length > 0) {


        if (tableRowBackgroundElements[tableRowBackgroundElements.length - 1].classList.contains("lighter-table-row")) {
            tableRowBackground.classList.add("darker-table-row");
        } else {
            tableRowBackground.classList.add("lighter-table-row");
        }
    } else {
        tableRowBackground.classList.add("lighter-table-row");
    }
    tableRowsBackgroundWrapper.appendChild(tableRowBackground);
    tableRowBackgroundElements.push(tableRowBackground);

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
        console.log(tableRowBackgroundElements[tableRowBackgroundElements.length - 1]);
        tableRowBackgroundElements[tableRowBackgroundElements.length - 1].remove();
        tableRowBackgroundElements.pop();
    });
    tableRow.appendChild(deleteRowButtonGridItem);


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

    // Label Text Input
    const textInputGridItem = document.createElement("input");
    textInputGridItem.classList.add("grid-item");
    textInputGridItem.value = incomeLabelInput.value;
    tableRow.appendChild(textInputGridItem);

    // Amount Number Input
    const numberInputGridItem = document.createElement("input");
    numberInputGridItem.classList.add("grid-item");
    numberInputGridItem.value = incomeAmountInput.value;
    tableRow.appendChild(numberInputGridItem);

    tableRowElements.push(tableRow);

    incomeLabelInput.value = "";
    incomeTypeInput.value = "Annually";
    incomeAmountInput.value = "";
});

/*
document.getElementById("Button for saving table and uploading to database").addEventListener("click", (e) => {
    for(let i = 0; i < tableRowElements.length; i++){

    }
});

 */