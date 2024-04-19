//  //import
 
//  const file: File = event.target.files[0];

//     const fileReader = new FileReader();
//     fileReader.onload = (e: any) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       workbook.SheetNames.forEach((sheetName => {
//         const worksheet = workbook.Sheets[sheetName];
//         const options = { header: 1, dateNF: 'yyyy-mm-dd' };
//         this.uploadedDatas = XLSX.utils.sheet_to_json(worksheet, options);
//         this.headingDatas = this.uploadedDatas.shift();
//         this.uploadedDatas = this.removeFalseItem(this.uploadedDatas);
//       }))
//     }
//     fileReader.readAsBinaryString(file);

// //export

//     exportToExcel() {
//       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableToExport'));
//       const wb: XLSX.WorkBook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
//       XLSX.writeFile(wb, 'table_data.xlsx');
//     }