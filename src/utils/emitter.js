import { EventEmitter } from 'events'; // Sửa mô-đun thành 'events'
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // Đặt số lượng người nghe tối đa không giới hạn
export const emitter = _emitter; // Xuất khẩu đối tượng emitter
