const formRecordService = document.querySelector(".form-write-to-service")
formRecordService.addEventListener("submit", (e) => {
    e.preventDefault()
    e.stopPropagation()

    const data = {}
    const inputs = formRecordService.getElementsByTagName("input")
    const selects = formRecordService.getElementsByTagName("select")
    const textAreas = formRecordService.getElementsByTagName("textarea")
    Array.from(inputs).forEach(input => {
        data[input.name] = input.value
    })
    Array.from(textAreas).forEach(txtArea => {
        data[txtArea.name] = txtArea.value
    })
    Array.from(selects).forEach(select => {
        data[select.name] = select.value
    })
    localStorage.setItem("form-write-to-service", JSON.stringify(data))
})

