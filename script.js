$(document).ready(function () {
  var ps = (cs = op = "");
  var f = 0;
  $("button").click(function () {
    var bt = $(this).val(); //value of button clicked
    operation(bt);
  });
  document.addEventListener("keydown", function (event) {
    ek = event.keyCode;
    if (ek == 8) {
      //8: backspace
      bt = "c";
    } else if (ek == 13) {
      //13: enter
      bt = "=";
    } else if (ek == 46) {
      //46: delete
      bt = "ac";
    } else if ((ek >= 48 && ek <= 57) || (ek >= 96 && ek <= 111)) {
      //40-57: 0-9, 96-105: numpad 0-9, 106-1011:*,+,-,.,/
      bt = event.key;
    }
    operation(bt);
  });
  function operation(bt) {
    var pop = document.getElementById("previous-operand");
    var opr = document.getElementById("op");
    var cop = document.getElementById("current-operand");
    if (!isNaN(bt) || bt == ".") {
      if (f == 1) {
        //flag to check if the button just previously clicked was = or not
        cs = "";
        f = 0; //reset flag
      }
      if ((bt == "." && cs.includes(".")) || (bt == "0" && cs == "0")) {
        cs = cs;
      } else {
        if (cs == "0" && bt != ".") {
          cs = "";
        } else if (cs == "" && bt == ".") {
          cs = "0";
        }
        cs += bt;
      }
    } else if (bt == "ac") {
      f = 0;
      cs = ps = op = "";
    } else if (bt == "c") {
      if (f == 1) {
        cs = ps = op = "";
        f = 0;
      } else {
        if (cs != "") {
          cs = cs.slice(0, -1);
        } else if (op != "") {
          op = op.slice(0, -1);
          cs = ps;
          ps = "";
        }
      }
    } else {
      f = 0;
      if (ps === "" && bt != "=") {
        ps = cs;
        cs = "";
        op = bt;
      } else if (cs != "" && ps != "") {
        pn = parseFloat(ps);
        cn = parseFloat(cs);
        op = opr.innerHTML;
        if (op == "+") {
          pn += cn;
        } else if (op == "-") {
          pn -= cn;
        } else if (op == "*") {
          pn *= cn;
        } else {
          pn /= cn;
        }
        if (bt != "=") {
          ps = pn;
          cs = "";
          op = bt;
        } else {
          f = 1; //set flag
          cs = pn;
          ps = "";
          op = "";
        }
      } else {
        if (bt != "=") {
          op = bt;
        }
      }
    }
    pop.innerHTML = ps;
    opr.innerHTML = op;
    cop.innerHTML = cs;
  }
  // });
});
