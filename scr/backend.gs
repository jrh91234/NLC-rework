function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var text = e.parameter.text || "ไม่มีข้อมูล";
    
    // --- ระบบเช็คข้อมูลซ้ำ (ปรับปรุงความเร็ว) ---
    // ใช้ TextFinder ค้นหาในคอลัมน์ B โดยตรง ซึ่งทำงานเร็วกว่าการดึงข้อมูลมาวนลูปมาก
    var duplicateSearch = sheet.getRange("B:B").createTextFinder(text).matchEntireCell(true).findNext();
    
    if (duplicateSearch) {
      // ถ้าเจอข้อมูลซ้ำ ให้ส่ง error กลับไป
      var duplicateResult = {"status": "error", "message": "ข้อมูลนี้ถูกสแกนและบันทึกไปแล้ว"};
      return ContentService.createTextOutput(JSON.stringify(duplicateResult))
        .setMimeType(ContentService.MimeType.JSON);
    }
    // --- สิ้นสุดระบบเช็คข้อมูลซ้ำ ---
    
    var timestamp = new Date();
    sheet.appendRow([timestamp, text]);
    
    var result = {"status": "success", "message": "บันทึกสำเร็จ"};
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    var result = {"status": "error", "message": error.toString()};
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
