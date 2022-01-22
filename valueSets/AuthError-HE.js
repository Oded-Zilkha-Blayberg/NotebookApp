export default HebrewAuthError = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
        case 'auth/email-already-exists':
            return "אופס... קיים משתמש עם כתובת המייל הזו. אם שכחת את הסיסמא תוכל לשחזר אותה";
        case 'auth/id-token-expired':
            return "אנחנו צריכים שתתחבר מחדש לאפליקציה כדי שנוכל לאמת את זהותך, מצטערים על חוסר הנוחות";
        case 'auth/id-token-revoked':
            return "נסה להתחבר מחדש כעת או מאוחר יותר, אנחנו צריכים לאמת מחדש את זהותך. מצטערים על חוסר הנוחות הזמנית";
        case 'auth/internal-error':
            return "אוי, יש לנו בעיה פנימית כרגע ולכן לא נוכל לחבר אותך ליישום. בבקשה נסה מאוחר יותר";
        case 'auth/invalid-argument':
            return "אחד הפרטים שהזנת אינו תקין, אנא בדוק ונסה שוב";
        case 'auth/invalid-display-name':
            return "השם שהזנת אינו תקין";
        case 'auth/invalid-email':
            return "כתובת האימייל שהזנת אינה תקינה";
        case 'auth/invalid-password':
            return "הסיסמא שהזנת אינה תקינה, סיסמא חייבת להכיל 6 תווים לפחות";
        case 'auth/invalid-phone-number':
            return "מספר הטלפון שהזנת אינו תקין";
        case 'auth/phone-number-already-exists':
            return "כבר קיים משתמש עם מספר זה. אם שכחת את הסיסמא תוכל לשחזר אותה";
        case 'auth/user-not-found':
            return "לא נמצא משתמש בעל פרטים אלו, האם תרצה להירשם?";
        case 'auth/wrong-password':
            return "שם משתמש או סיסמא לא נכונים";
        case 'auth/too-many-requests':
            return "הגישה לחשבון זה נחסמה באופן זמני בעקבות מספר רב של בקשות התחברות. ממליצים לך לנסות להתחבר מאוחר יותר או להתחבר כבר כעת על ידי שינוי הסיסמא";
    }

    return error.message;
}