import Vue from 'vue'

const transliterate = function (string) {
        if (!string.length){
            return
        }
        const rus = 'щ ш ч ц ю я ё ж ы э а б в г д е з и й к л м н о п р с т у ф х'.split(' ')
        const eng = 'sch sh ch cz yu ya yo zh y e a b v g d e z i j k l m n o p r s t u f h'.split(' ')
        const letters = string.toLowerCase().split('')
        const result = []
        let newLetter = ''
        for (const letter of letters){
            if (rus.includes(letter)){
                newLetter = eng[rus.indexOf(letter)]
            } else if (letter === ' ' || letter === '-') {
                newLetter = '-'
            } else if (eng.includes(letter) || /[0-9]/.test(letter)){
                newLetter = letter
            } else {
                newLetter = ''
            }
            result.push(newLetter)
        }
        return result.join('')
    }
const trancate = function (content, charsNumber){
    if (content.length <= charsNumber){
        return content.replace(/<.*?>/g, '')
    } else {
        return content.split('').splice(0, charsNumber).join('').replace(/<.*?>/g, '')
    }
}

Vue.prototype.$transliterate = transliterate
Vue.prototype.$trancate = trancate

export default ({app}, inject) => {
    inject('transliterate', transliterate)
    inject('trancate', trancate)
}
