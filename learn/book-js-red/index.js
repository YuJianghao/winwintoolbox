import { section, print, note, important } from './printer.js'
section('3.x 语言基础', true, () => {
    section('3.4 数据类型', () => {
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
            section('此外还有一些Symbol.xxx的内置符号', () => {
                important('Symbol类型可以用来改变系统默认行为')
            })
        })
    })
    section('3.5 操作符', () => {
        section('递增递减', () => {
            note('操作符在前会先改变变量的值，在后会先计算表达式，然后改变变量的值')
            let age = 29
            print('++age', age, 'to', ++age, 'final', age)
            age = 29
            print('age++', age, 'to', age++, 'final', age)
        })
    })
    section('3.6 语句', () => {
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
        section('switch', () => {
            note('使用switch(true)就可以在case中使用条件判断')
            let num = 25
            switch (true) {
                case num > 10:
                    print('num > 10')
                    break
                default:
                    print('default')
            }
        })
    })
})
section('4.x 变量、作用域与内存', () => {
    important('上一章说到的六种都是原始值，其他的都是引用')
    section('4.1 原始值与引用值', () => {
        note('引用值可以动态添加属性')
        important('原始值的复制直接复制值到新的变量中，引用值只复制引用')
        {
            let num1 = 5
            let num2 = num1
            num1 = 10
            print({ num1, num2 })
        }
        section('4.1.2 传递参数', () => {
            important('ECMAScript中所有函数参数都是值传递')
            note('传递参数')
            {
                function addTen(num) {
                    num += 10
                    return num
                }
                let count = 20
                let result = addTen(count)
                print({ count, result })
            }
            note('传递对象的引用')
            {
                function setName(obj) {
                    obj.name = 'Nicholas'
                }
                let person = new Object()
                setName(person)
                print(person.name)
            }
            important('更改函数参数值并不会更改原来变量的对象引用')
            {
                function setName(obj) {
                    obj.name = 'Nicholas'
                    // 更改obj不会更改person引用
                    obj = new Object()
                    obj.name = 'Greg'
                }
                let person = new Object()
                setName(person)
                print(person.name)
            }
        })
    })
    section('4.2 执行上下文与作用域', () => {
        important('局部作用域的变量可以替换上层作用域的变量')
        note('是不是以后不用with语句了：\nStrict mode code may not include a with statement')
    })
    section('4.3 垃圾回收', () => {
        important('避免JS的先创建再补充（或删除）的动态属性赋值可以提升性能')
        note('可以复制null来实现清空和触发垃圾回收')
    })
})