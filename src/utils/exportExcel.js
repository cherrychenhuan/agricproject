// 导入依赖
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
 
/**
 * 导出Excel表格
 * @param name 生成excel的文件名，如：interestTable.xlsx
 * @param tableName 表格的id，如：#tableId
 * */
export const exportExcel = (name, tableName) => {
    let sel = XLSX.utils.table_to_book(document.querySelector(tableName))
    let selIn = XLSX.write(sel, { bookType: 'xlsx', bookSST: true, type: 'array' })
 
    try {
        FileSaver.saveAs(new Blob([selIn], { type: 'application/octet-stream' }), name)
    } catch (e) {
        if (typeof console !== 'undefined') console.log(e, selIn)
    }
 
    return selIn
}