import { reject } from "lodash";

class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error); // Đổi từ reader.error thành reader.onerror
        });
    }
}

export default CommonUtils;