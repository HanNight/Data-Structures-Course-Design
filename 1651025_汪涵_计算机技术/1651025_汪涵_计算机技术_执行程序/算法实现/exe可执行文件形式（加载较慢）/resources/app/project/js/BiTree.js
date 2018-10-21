function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.LTag = "Link";
    this.RTag = "Link";
}

var Leaf_Num = 0;
var Height = 0;

function Create_BiTree(preseq) {
    //按先序遍历输入构造二叉树
    var arr = [];
    Leaf_Num = 0;
    for (var i = 0; i < preseq.length; i++) {
        arr.push(preseq[i]);
    }

    function create_bitree(arr, i) {
        var data = arr.shift(), t = null;
        if (data != "#") {
            if (i > Height) {
                Height = i;
            }
            t = new Node(data);
            t.data = data;
            t.left = create_bitree(arr, i + 1);
            t.right = create_bitree(arr, i + 1);
            if (!t.left && !t.right) {
                Leaf_Num++;
            }
        }
        return t;
    }

    return create_bitree(arr, 1);
}

function Pre_Order_Traverse(T) {
    //递归先序遍历
    var pre_seq = [];

    function pre_order_traverse(T) {
        if (!T) {
            return;
        }
        pre_seq.push(T.data);
        pre_order_traverse(T.left);
        pre_order_traverse(T.right);
        return;
    }

    pre_order_traverse(T);
    return pre_seq;
}

function In_Order_Traverse(T) {
    //递归中序遍历
    var in_seq = [];

    function in_order_traverse(T) {
        if (!T) {
            return;
        }
        in_order_traverse(T.left);
        in_seq.push(T.data);
        in_order_traverse(T.right);
        return;
    }

    in_order_traverse(T);
    return in_seq;
}

function Post_Order_Traverse(T) {
    //递归后序遍历
    var post_seq = [];

    function post_order_traverse(T) {
        if (!T) {
            return;
        }
        post_order_traverse(T.left);
        post_order_traverse(T.right);
        post_seq.push(T.data);
        return;
    }

    post_order_traverse(T);
    return post_seq;
}

function Pre_Order_Threading(T) {
    //先序遍历建立线索二叉树
    var Prev = null;

    function pre_order_threading(T) {
        if (!T) {
            return;
        }
        if (!T.left) {
            T.left = Prev;
            T.LTag = "Thread";
        }
        if (Prev && !Prev.right) {
            Prev.right = T;
            Prev.RTag = "Thread";
        }
        Prev = T;
        if (T.LTag === "Link") {
            pre_order_threading(T.left);
        }
        if (T.RTag === "Link") {
            pre_order_threading(T.right);
        }
    }

    pre_order_threading(T);
    console.log(Prev);
    Prev.right = null;
    Prev.RTag = "Thread";
}

function PreThreadTree_Visit(T) {
    //对先序线索二叉树先序遍历
    var pre_seq = [];

    function prethreadtree_visit(T) {
        while (T) {
            while (T.left && T.LTag === "Link") {
                pre_seq.push(T.data);
                if (!T.left) {
                    pre_seq.push(T.left);
                }
                else {
                    pre_seq.push(T.left.data);
                }
                pre_seq.push(T.LTag);
                if (!T.right) {
                    pre_seq.push(T.right);
                }
                else {
                    pre_seq.push(T.right.data);
                }
                pre_seq.push(T.RTag);
                T = T.left;
            }
            pre_seq.push(T.data);
            if (!T.left) {
                pre_seq.push(T.left);
            }
            else {
                pre_seq.push(T.left.data);
            }
            pre_seq.push(T.LTag);
            if (!T.right) {
                pre_seq.push(T.right);
            }
            else {
                pre_seq.push(T.right.data);
            }
            pre_seq.push(T.RTag);
            if (T.LTag === "Thread") {
                T = T.right;
            }
            while (T) {
                if (T.left && T.LTag == "Link") {
                    break;
                }
                pre_seq.push(T.data);
                if (!T.left) {
                    pre_seq.push(T.left);
                }
                else {
                    pre_seq.push(T.left.data);
                }
                pre_seq.push(T.LTag);
                if (!T.right) {
                    pre_seq.push(T.right);
                }
                else {
                    pre_seq.push(T.right.data);
                }
                pre_seq.push(T.RTag);
                T = T.right;
            }
        }
    }

    prethreadtree_visit(T);
    return pre_seq;
}

function In_Order_Threading(T) {
    //中序遍历建立线索二叉树
    var Prev = null;

    function in_order_threading(T) {
        if (!T) {
            return;
        }
        if (T.LTag === "Link") {
            in_order_threading(T.left);
        }
        if (!T.left) {
            T.left = Prev;
            T.LTag = "Thread";
        }
        if (Prev && !Prev.right) {
            Prev.right = T;
            Prev.RTag = "Thread";
        }
        Prev = T;
        if (T.RTag == "Link") {
            in_order_threading(T.right);
        }
    }

    in_order_threading(T);
    Prev.right = null;
    Prev.RTag = "Thread";
}

function InThreadTree_Visit(T) {
    //对中序线索二叉树中序遍历
    var in_seq = [];

    function inthreadtree_visit(T) {
        if (!T) {
            return;
        }
        while (T) {
            while (T.LTag === "Link") {
                T = T.left;
            }
            in_seq.push(T.data);
            if (!T.left) {
                in_seq.push(T.left);
            }
            else {
                in_seq.push(T.left.data);
            }
            in_seq.push(T.LTag);
            if (!T.right) {
                in_seq.push(T.right);
            }
            else {
                in_seq.push(T.right.data);
            }
            in_seq.push(T.RTag);
            while (T.right && T.RTag === "Thread") {
                T = T.right;
                in_seq.push(T.data);
                if (!T.left) {
                    in_seq.push(T.left);
                }
                else {
                    in_seq.push(T.left.data);
                }
                in_seq.push(T.LTag);
                if (!T.right) {
                    in_seq.push(T.right);
                }
                else {
                    in_seq.push(T.right.data);
                }
                in_seq.push(T.RTag);
            }
            T = T.right;
        }
    }

    inthreadtree_visit(T);
    return in_seq;
}

function Level_Order_Traverse(T) {
    //层次遍历
    var level_seq = [];

    function level_order_traverse_part1(T, i, j, father, which) {
        if (!T || i > Height) {
            return;
        }
        if (i === j) {
            var x = {
                data: T.data,
                floor: i,
                widthRatio: 1 / Math.pow(2, i - 1),
                which: which
            };
            if (i === 1) {
                x.father = x;
            }
            else {
                for (var k = 0; k < level_seq.length; k++) {
                    if (level_seq[k].data === father) {
                        x.father = level_seq[k];
                        break;
                    }
                }
            }
            level_seq.push(x);
        }
        level_order_traverse_part1(T.left, i + 1, j, T.data, 0);
        level_order_traverse_part1(T.right, i + 1, j, T.data, 1);
    }

    function level_order_traverse_part2(T) {
        if (!T) {
            return;
        }
        for (var i = 1; i <= Height; i++) {
            level_order_traverse_part1(T, 1, i, null, 0);
        }
    }

    level_order_traverse_part2(T);
    return level_seq;
}

function Show_Tree(T) {
    var svg = document.getElementById("svg");
    var circleStr = "", lineStr = "", textStr = ""; //圆、线和文本的HTML字符串
    var nodes = Level_Order_Traverse(T); //层序遍历生成数组
    console.log(nodes);
    //计算画树需要的画布尺寸
    var size = (function (nodes) {
        var numArr = [];
        for (var i = 0; i < nodes.length; i++) {
            if (numArr[nodes[i].floor - 1] === undefined) {
                numArr[nodes[i].floor - 1] = 0;
            }
            numArr[nodes[i].floor - 1]++;
        }
        //console.log(numArr);
        var max = 0;
        for (var i = 0; i < numArr.length; i++) {
            if (numArr[i] > max) {
                max = numArr[i];
            }
        }
        //console.log(max);
        var size = {
            width: max * 100,
            height: numArr.length * 80 + 80
        }
        return size;
    })(nodes);
    svg.setAttribute("width", size.width);
    svg.setAttribute("height", size.height);
    svg.parentNode.style.width = size.width + "px";
    var width = size.width;

    var occupyWidth = 0, preFloor = 0;//当前层之前结点占用的宽度，之前的层数
    //遍历所有树的结点，生成圆、线和文本的HTML字符串
    for (var i = 0; i < nodes.length; i++) {
        //如果依然处于当前层，则累加占用宽度，否则将占用宽度置零，更新层数
        if (preFloor === nodes[i].floor) {
            occupyWidth += nodes[i - 1].width * width;
        } else {
            occupyWidth = 0;
            preFloor = nodes[i].floor;
        }

        var cx = 0, cy = 0;//当前结点的定位像素坐标
        cx = occupyWidth + width * nodes[i].width / 2;
        cy = nodes[i].floor * 80;
        nodes[i].cx = cx;
        nodes[i].cy = cy;
        lineStr += '<line x1="' + nodes[i].cx + '" y1="' + nodes[i].cy + '" x2="' + nodes[i].father.cx +
            '" y2="' + nodes[i].father.cy + '" style="stroke:black;stroke-width:2" />';
        circleStr += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="#9F79EE"/></circle>';
        //调整文本缩进
        var textcx = nodes[i].data > 9 ? (nodes[i].cx - 10) : (nodes[i].cx - 5),
            textcy = (nodes[i].cy + 6);
        textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="white">' + nodes[i].data + '</text>';
    }
    svg.innerHTML = lineStr + circleStr + textStr;
}

function Show_Tree_Traverse(T, id) {
    var svg = document.getElementById("svg");
    svg.innerHTML = "";
    var circleStr = "", lineStr = "", textStr = "";//圆、线和文本的HTML字符串
    var nodes = Level_Order_Traverse(T);
    console.log(id);
    //计算画树需要的画布尺寸
    var size = (function (nodes) {
        var numArr = [];
        for (var i = 0; i < nodes.length; i++) {
            if (numArr[nodes[i].floor - 1] === undefined) {
                numArr[nodes[i].floor - 1] = 0;
            }
            numArr[nodes[i].floor - 1]++;
        }
        //console.log(numArr);
        var max = 0;
        for (var i = 0; i < numArr.length; i++) {
            if (numArr[i] > max) {
                max = numArr[i];
            }
        }
        //console.log(max);
        var size = {
            width: max * 100,
            height: numArr.length * 80 + 80
        }
        return size;
    })(nodes);
    //设置SVG画布尺寸
    // svg.setAttribute("width",size.width);
    svg.setAttribute("height", size.height);
    // svg.parentNode.style.width = size.width+"px";
    var width = size.width;
    console.log(width);

    //遍历所有树的结点，生成圆、线和文本的HTML字符串
    for (var i = 0; i < nodes.length; i++) {
        var nodeColor = nodes[i].data === id ? "#080808" : "#9F79EE";

        var cx = 0, cy = 0;//当前结点的定位像素坐标
        var father = nodes[i].father;
        if (i === 0) {
            father.cx = width / 2;
        }
        //父节点宽度的最左边
        var start = father.cx - width * father.widthRatio / 2;
        //当前结点的横坐标
        cx = start + width * nodes[i].widthRatio * (nodes[i].which + 0.5);
        console.log(start, cx);
        cy = nodes[i].floor * 80;
        nodes[i].cx = cx;
        nodes[i].cy = cy;
        lineStr += '<line x1="' + cx + '" y1="' + cy + '" x2="' + nodes[i].father.cx +
            '" y2="' + nodes[i].father.cy + '" style="stroke:black;stroke-width:2" />';
        console.log(lineStr);
        circleStr += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="' + nodeColor + '"/></circle>';
        //调整文本缩进
        var textcx = nodes[i].data > 9 ? (nodes[i].cx - 10) : (nodes[i].cx - 5),
            textcy = (nodes[i].cy + 6);
        textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="white">' + nodes[i].data + '</text>';
    }
    svg.innerHTML = lineStr + circleStr + textStr;
}

// var tree = new BinaryTree();

var Tree;
var Tree1;
var Tree2;
var button1 = document.getElementById("button1");
button1.addEventListener("click", function () {
    var input_seq = document.getElementById("getdata").value;



    console.log(input_seq);

    Tree = Create_BiTree(input_seq);
    $("#leafnum").empty();
    $("#output").empty();
    $("#output1").empty();
    $("#output2").empty();
    $("#leafnum").append("<span><strong>叶子节点个数为：%data%</strong></span>".replace("%data%", Leaf_Num));
    Tree1 = Create_BiTree(input_seq);
    Tree2 = Create_BiTree(input_seq);
    console.log(Tree);
    var nodes = Level_Order_Traverse(Tree);//层序遍历生成数组
    console.log(nodes);
    // Show_Tree(nodes);
    var traversalArr = Post_Order_Traverse(Tree);
    Show_Tree_Traverse(Tree, null, nodes);
    //var traversalArr = tree.PreOrderTraversal(treeData);
    var select = document.getElementById("select");
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        if (button.click === false) {
            return;
        } else {
            button.click = false;
        }
        var nodes = Level_Order_Traverse(Tree);//层序遍历生成数组
        var traversalArr = Post_Order_Traverse(Tree);
        var index = select.selectedIndex;
        console.log(index);
        switch (index) {
            case 1: traversalArr = Pre_Order_Traverse(Tree)
                break;
            case 2: traversalArr = In_Order_Traverse(Tree)
                break;
            case 3: traversalArr = Post_Order_Traverse(Tree)
                break;

        }

        $("#output").empty();
        //注意，这里故意
        for (var i = 0; i <= traversalArr.length; i++) {
            setTimeout(function (i) {
                Show_Tree_Traverse(Tree, traversalArr[i], nodes);
                if (i >= traversalArr.length) {
                    button.click = true;
                    console.log("OK");

                    var result = "";
                    for (var i = 0; i < traversalArr.length; i++) {
                        result = result + traversalArr[i];
                    }

                    console.log(result);

                    switch (index) {
                        case 1: $("#output").append("<span><strong>先序遍历结果：%data%</strong></span>".replace("%data%", result));
                            break;
                        case 2: $("#output").append("<span><strong>中序遍历结果：%data%</strong></span>".replace("%data%", result));
                            break;
                        case 3: $("#output").append("<span><strong>后序遍历结果：%data%</strong></span>".replace("%data%", result));
                            break;
                    }
                }
            }, 400 * i, i);
        }

        // var result = "";
        // for(var i = 0; i <=traversalArr.length; i++){
        //     result = result + traversalArr[i];
        // }

        // console.log(result);

        // switch(index){
        //     case 0: $(".output").append("<span>先序遍历结果：%data%</span>".replace("%data%", result));
        //             break;
        //     case 1: $(".output").append("<span>中序遍历结果：%data%</span>".replace("%data%", result));
        //             break;
        //     case 2: $(".output").append("<span>后序遍历结果：%data%</span>".replace("%data%", result));
        //             break;
        // }
    });

});


// console.log(Tree);
// var Tree1 = Tree;
// var Tree2 = Tree;

var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");

button2.addEventListener("click", function () {
    // console.log(Tree);
    // var Tree1 = Tree;
    $("#output1").empty();
    console.log(Tree1);
    Pre_Order_Threading(Tree1);
    console.log(Tree1);
    var output_seq = PreThreadTree_Visit(Tree1);
    for (var i = 0; i < output_seq.length / 5; i++) {
        var result = output_seq[i * 5] + " { Pre: " + output_seq[i * 5 + 1] + " ,LTag: " + output_seq[i * 5 + 2] + "} { Suc: " + output_seq[i * 5 + 3] + " ,RTag: " + output_seq[i * 5 + 4] + "}";
        $("#output1").append("<h5><strong>%data%</strong></h5>".replace("%data%", result));
    }

});

button3.addEventListener("click", function () {
    // console.log(Tree);
    // var Tree2 = Tree;
    $("#output2").empty();
    console.log(Tree2);
    In_Order_Threading(Tree2);
    console.log(Tree2);
    var output_seq = InThreadTree_Visit(Tree2);
    console.log(output_seq);
    for (var i = 0; i < output_seq.length / 5; i++) {
        var result = output_seq[i * 5] + " { Pre: " + output_seq[i * 5 + 1] + " ,LTag: " + output_seq[i * 5 + 2] + "} { Suc: " + output_seq[i * 5 + 3] + " ,RTag: " + output_seq[i * 5 + 4] + "}";
        $("#output2").append("<h5><strong>%data%</strong></h5>".replace("%data%", result));
    }

});
