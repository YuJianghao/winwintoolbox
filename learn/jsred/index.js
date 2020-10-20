import { section, print, note, important } from './printer.js'
section('数据类型',  () => {
    section('Symbol 类型', () => {
        section('基础', () => {
            note('用于保证对象属性使用唯一标识，避免属性冲突')
        })
        section('使用符号作为属性', () => {
            note('凡事可以使用字符串或者数值作为属性的地方，都可以使用符号')
            const s = Symbol('foo')
            const o = {
                [s]: 1,
                bar: 2
            }
            print(o)
            print(Object.keys(o), Object.keys(o).length)
            note('由此可见，符号作为键的时候不能直接用`Object.keys`查看，需要显示保存')
        })
        section('此外还有一些Symbol.xxx的内置符号',()=>{
            important('Symbol类型可以用来改变系统默认行为')
        })
    })
})
section('操作符',  () => {
    section('递增递减', () => {
        note('操作符在前会先改变变量的值，在后会先计算表达式，然后改变变量的值')
        let age = 29
        print('++age', age, 'to', ++age, 'final', age)
        age = 29
        print('age++', age, 'to', age++, 'final', age)
    })
})
section('语句', () => {
    let arr = Object.keys(new Array(3).fill(0)).map((v, idx) => `I'm item[${idx}]`)
    section('for', () => {
        section('for in', () => {
            for (const item in arr) {
                print(item)
            }
        })
        section('for of', () => {
            for (const item of arr) {
                print(item)
            }
        })
    })
    section('标签语句、break和continue', () => {
        note('简单理解为：标签语句为不同的循环打上标签，方便选择continue接下来需要进行的循环是哪个')
        let num = 0
        outermost:
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i === 5 && j === 5) {
                    continue outermost
                }
                num++
            }
        }
        print(num)
    })
    section('switch',()=>{
        note('使用switch(true)就可以在case中使用条件判断')
        let num = 25
        switch(true){
            case num>10:
                print('num > 10')
                break
            default:
                print('default')
        }
    })
})