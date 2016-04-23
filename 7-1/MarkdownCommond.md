# Markdown命令
---
+ ## 强调
> 星号与下划线都可以，单是斜体，双是粗体，符号可跨行，符号可加空格
    >>**一个人来到田纳西**
__毫无疑问__
*我做的馅饼
是全天下*
_最好吃的_
+ ## 分割线
> 三个或更多-_*，必须单独一行，可含空格
    >>---
+ ## 引用
> 翻译成html就是<blockquote></blockquote>符号后的空格可不要
+ ## 标题
>
大标题
===
小标题
---
+ ## 无序列表
> 符号之后的空格不能少，-+*效果一样，但不能混合使用，因混合是嵌套列表，内容可超长

 >  符号之后的空格不能少，-+*效果一样，但不能混合使用，因混合是嵌套列表
+ ## 有序列表
> 数字不能省略但可无序，点号之后的空格不能少
    >>  1. 有序列表
        2. 有序列表
        3. 有序列表
        8. 有序列表
+ ## 文字超链：Inline方式
>
[不如](http://bruce-sha.github.io "不如的博客")

+ ## 图片超链
> 多个感叹号，Tooltips可省略，要设置大小只能借助HTML标记
    >>
![GitHub Mark](http://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png "GitHub Mark")

+ ## 索引超链：Reference方式
> 索引，1 2可以是任意字符
    >> [不如][1]
![GitHub Octocat][2]

[1]:http://bruce-sha.github.io
[2]:http://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png

+ ## 自动连接
> 尖括号
    >>
<http://ibruce.info>
<bu.ru@qq.com>
+ ## 代码：行内代码
> 在第一行后指定编程语言，也可以不指定
    >> <!--￼0-->
        val s = "hello Markdown"
        println( s )

+ ## 代码：段落代码
> 每行文字前加4个空格或者1个Tab
    >>  
        val s = "hello Markdown"
        println( s )

+ ## 代码：hexo
> 可指定编程语言，『』代表左右大括号
    >>
        『% codeblock [title] [lang:language] [url] [link text] %』
        	code snippet
        『% endcodeblock %』
+ ## 注释
> 用html的注释，好像只有这样？

+ ## 转义字符
> 用html的注释，好像只有这样？
    >>
        Markdown中的转义字符为\，转义的有：
        \\ 反斜杠
        \` 反引号
        \* 星号
        \_ 下划线
        \{\} 大括号
        \[\] 中括号
        \(\) 小括号
        \# 井号
        \+ 加号
        \- 减号
        \. 英文句号
        \! 感叹号

```
x = 0
x = 2 + 2
what is x
```
+ ## 表格
                    First Header  | Second Header
                    ------------- | -------------
                    Content Cell  | Content Cell
                    Content Cell  | Content Cell
