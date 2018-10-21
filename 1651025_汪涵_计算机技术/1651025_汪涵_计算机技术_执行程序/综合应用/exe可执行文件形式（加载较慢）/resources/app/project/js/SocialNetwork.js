var marge = { top: 60, bottom: 60, left: 60, right: 60 };
var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");
var g = svg.append("g").attr("transform", "translate(" + marge.top + "," + marge.left + ")");

console.log(width, height);

var nodes = [];
var edges = [];

//设置一个color的颜色比例尺
var colorScale = d3.scaleOrdinal()
    .domain(d3.range(50))
    .range(d3.schemeCategory10);

var button1 = document.getElementById("button1");

button1.addEventListener("click", function () {
    var person = {};
    person.name = document.getElementById("input1").value;
    person.location = document.getElementById("input2").value;
    person.school1 = document.getElementById("input3").value;
    person.school2 = document.getElementById("input4").value;
    person.school3 = document.getElementById("input5").value;
    person.workplace = document.getElementById("input6").value;
    document.getElementById("input1").value = '';
    document.getElementById("input2").value = '';
    document.getElementById("input3").value = '';
    document.getElementById("input4").value = '';
    document.getElementById("input5").value = '';
    document.getElementById("input6").value = '';
    nodes.push(person);
    for (var i = 0; i < nodes.length - 1; i++) {
        var flag = false;
        var edge = {
            "source": nodes.length - 1, //边的起点
            "target": i,                //边的终点
            "relation": "",             //边所代表的关系
            "value": 3                  //边的权重，即两人社会关系的远近
        };
        console.log(edge);
        if (nodes[i].location === nodes[nodes.length - 1].location) {
            flag = true;
            edge.relation = edge.relation + "同城";
            edge.value = edge.value - 0.5;
        }
        if (nodes[i].school1 === nodes[nodes.length - 1].school1 || nodes[i].school2 === nodes[nodes.length - 1].school2 || nodes[i].school3 === nodes[nodes.length - 1].school3) {
            flag = true;
            if (edge.relation === "") {
                edge.relation = edge.relation + "同学";
            }
            else {
                edge.relation = edge.relation + "/同学";
            }
            if (nodes[i].school1 === nodes[nodes.length - 1].school1) {
                edge.value = edge.value - 0.5;
            }
            if (nodes[i].school2 === nodes[nodes.length - 1].school2) {
                edge.value = edge.value - 0.5;
            }
            if (nodes[i].school3 === nodes[nodes.length - 1].school3) {
                edge.value = edge.value - 0.5;
            }
        }
        if (nodes[i].workplace === nodes[nodes.length - 1].workplace) {
            flag = true;
            if (edge.relation === "") {
                edge.relation = edge.relation + "同事";
            }
            else {
                edge.relation = edge.relation + "/同事";
            }
            edge.value = edge.value - 0.5;
        }
        if (flag) {
            edges.push(edge);
        }
    }

    console.log(nodes);
    console.log(edges);
    d3.select('svg').html(null);//111
    var g = svg.append("g").attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    let simulation = d3.forceSimulation() // 构建力导向图
        .force('link', d3.forceLink().id(function (d, i) { return i; }).distance(function (d) { return d.value * 100; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    let link = g.append("g") // 画连接线
        .attr("class", "links")
        .selectAll("line")
        .data(edges)
        .enter().append("line")
        .style('stroke-width', '1px')
        .style('stroke', '#ddd');

    let linkText = g.append("g") // 画连接线上面的关系文字
        .attr("class", "link-text")
        .selectAll("text")
        .data(edges)
        .enter().append("text")
        .text(function (d) {
            return d.relation;
        })
        .style("fill-opacity", 0);

    let node = g.append("g") // 画圆圈和文字
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")//123
        .on("mouseover", function (d, i) {
            //显示连接线上的文字
            linkText.style("fill-opacity", function (edge) {
                if (edge.source === d || edge.target === d) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            //连接线加粗
            link.style('stroke-width', function (edge) {
                if (edge.source === d || edge.target === d) {
                    return '2px';
                }
                else {
                    return '1px';
                }
            }).style('stroke', function (edge) {
                if (edge.source === d || edge.target === d) {
                    return '#000';
                }
                else {
                    return '#ddd';
                }
            });
        })
        .on("mouseout", function (d, i) {
            //隐去连接线上的文字
            linkText.style("fill-opacity", function (edge) {
                if (edge.source === d || edge.target === d) {
                    return 0;
                }
                else {
                    return 0;
                }
            });
            //连接线减粗
            link.style('stroke-width', function (edge) {
                if (edge.source === d || edge.target === d) {
                    return '1px';
                }
                else {
                    return '1px';
                }
            }).style('stroke', function (edge) {
                if (edge.source === d || edge.target === d) {
                    return '#ddd';
                }
                else {
                    return '#ddd';
                }
            });
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on('dblclick', connectedNodes);;

    node.append('circle')
        .attr("r", 5)
        .attr('fill', function (d, i) { return colorScale(i); });

    node.append("text")
        .attr('fill', function (d, i) { return colorScale(i); })
        .attr("x", -10)//123
        .attr("y", -20)
        .attr("dy", ".71em")
        .text(function (d) { return d.name; });

    //1111
    //Toggle stores whether the highlighting is on
    var toggle = 0;
    //Create an array logging what is connected to what
    var linkedByIndex = {};
    for (i = 0; i < nodes.length; i++) {
        linkedByIndex[i + "," + i] = 1;
    };
    edges.forEach(function (d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
        linkedByIndex[d.target.index + "," + d.source.index] = 1;

        console.log(linkedByIndex[d.source.index + "," + d.target.index]);
    });
    //This function looks up whether a pair are neighbours
    function neighboring(a, b) {
        console.log(a, b);
        console.log(linkedByIndex[a.index + "," + b.index]);
        return linkedByIndex[a.index + "," + b.index];
    }
    function connectedNodes() {
        edges.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
            linkedByIndex[d.target.index + "," + d.source.index] = 1;

            console.log(linkedByIndex[d.source.index + "," + d.target.index]);
        });
        if (toggle == 0) {
            //Reduce the opacity of all but the neighbouring nodes
            d = d3.select(this).node().__data__;
            node.style("opacity", function (o) {
                return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
            });
            link.style("opacity", function (o) {
                return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
            });
            //Reduce the op
            toggle = 1;
        } else {
            //Put them back to opacity=1
            node.style("opacity", 1);
            link.style("opacity", 1);
            toggle = 0;
        }
    }

    //1111

    simulation.nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(edges);

    function ticked() { // 力导向图变化函数，让力学图不断更新
        nodes.forEach(function (d, i) {
            d.x = d.x < 0 ? 0 : d.x;
            d.x = d.x > width - 65 ? width - 65 : d.x;
            d.y = d.y < 0 ? 0 : d.y;
            d.y = d.y > height - 65 ? height - 65 : d.y;
        })
        link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        linkText.attr("x", function (d) { return (d.source.x + d.target.x) / 2; })
            .attr("y", function (d) { return (d.source.y + d.target.y) / 2; });
        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    function dragstarted(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;

    }
});

function sortNumber(a, b) {
    return a - b;
}

function sortCorrelation(a, b) {
    return a.correlation - b.correlation;
}

var button2 = document.getElementById("button2");

button2.addEventListener("click", function () {
    d3.select("#output").html(null);
    var Sname = document.getElementById("input7").value;
    document.getElementById("input7").value = '';
    var flag = false;
    var loc;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].name === Sname) {
            flag = true;
            loc = i;
            break;
        }
    }

    var Adj = [];
    for (var i = 0; i < nodes.length; i++) {
        var Adj_son = [];
        for (var j = 0; j < edges.length; j++) {
            if (edges[j].source.index === i && Adj_son.indexOf(edges[j].target.index) === -1) {
                Adj_son.push(edges[j].target.index);
            }
            if (edges[j].target.index === i && Adj_son.indexOf(edges[j].source.index) === -1) {
                Adj_son.push(edges[j].source.index);
            }
        }
        console.log(Adj_son);
        Adj_son.sort(sortNumber);
        console.log(Adj_son);
        Adj.push(Adj_son);
    }

    console.log(Adj);

    if (!flag) {
        $("#output").append("<br><span><strong>%data%不在社会关系网络中</strong></span>".replace("%data%", Sname));
    }
    else {
        var may_know_people = [];
        for (var i = 0; i < Adj.length; i++) {
            if (i != loc) {
                if (Adj[i].indexOf(loc) === -1) {
                    var num = 0;
                    for (var j = 0; j < Adj[i].length; j++) {
                        if (Adj[loc].indexOf(Adj[i][j]) != -1) {
                            num++;
                        }
                    }
                    if (num != 0) {
                        var people = {
                            "name": nodes[i].name,
                            "correlation": num
                        };
                        may_know_people.push(people);
                    }
                }
            }
        }
        console.log(may_know_people);
        if (may_know_people.length === 0) {
            $("#output").append("<br><span><strong>%data%没有可能认识的人（非好友）</strong></span>".replace("%data%", Sname));
        }
        else {
            may_know_people.sort(sortCorrelation);
            console.log(may_know_people);
            $("#output").append("<br><span><strong>%data%的可能认识的人（非好友）如下（按关联度排序）：</strong></span><br>".replace("%data%", Sname));
            $("#output").append('<ul id="sortlist"></ul>');
            for (var i = 0; i < may_know_people.length; i++) {
                $("#sortlist").append("<li>" + may_know_people[i].name + "，关联度：" + may_know_people[i].correlation + "</li>");
            }
        }
    }

})