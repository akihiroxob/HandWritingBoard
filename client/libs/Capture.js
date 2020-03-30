navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

const medias = {
    audio: true,
    video: {
        facingMode: {
            exact: 'environment'
            //exact: 'user'
        }
    }
};

const macMedias = {
    audio: true,
    video: true
};

const THRESHOLD = 65;
export default class Capture {
    static getCamera() {
        return navigator.mediaDevices
            .getUserMedia(medias)
            .then(stream => {
                return stream;
            })
            .catch(() => {
                return navigator.mediaDevices.getUserMedia(macMedias);
            });
    }

    static toBinary(src, dst) {
        for (var i = 0; i < src.data.length; i = i + 4) {
            var y = ~~(
                0.299 * src.data[i] +
                0.587 * src.data[i + 1] +
                0.114 * src.data[i + 2]
            );
            var ret = y > THRESHOLD ? 255 : 0;
            dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = ret;
            dst.data[i + 3] = src.data[i + 3];
        }
        return dst;
    }

    static toAlpha(img) {}
}
