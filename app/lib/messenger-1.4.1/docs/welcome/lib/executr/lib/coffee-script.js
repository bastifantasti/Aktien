/**
 * CoffeeScript Compiler v1.4.0
 * http://coffeescript.org
 *
 * Copyright 2011, Jeremy Ashkenas
 * Released under the MIT License
 */
(function (root) {
    var CoffeeScript = function () {
        function require(a) {
            return require[a]
        }

        return require["./helpers"] = new function () {
            var a = this;
            ((function () {
                var b, c, d;
                a.starts = function (a, b, c) {
                    return b === a.substr(c, b.length)
                }, a.ends = function (a, b, c) {
                    var d;
                    return d = b.length, b === a.substr(a.length - d - (c || 0), d)
                }, a.compact = function (a) {
                    var b, c, d, e;
                    e = [];
                    for (c = 0, d = a.length; c < d; c++)b = a[c], b && e.push(b);
                    return e
                }, a.count = function (a, b) {
                    var c, d;
                    c = d = 0;
                    if (!b.length)return 1 / 0;
                    while (d = 1 + a.indexOf(b, d))c++;
                    return c
                }, a.merge = function (a, c) {
                    return b(b({}, a), c)
                }, b = a.extend = function (a, b) {
                    var c, d;
                    for (c in b)d = b[c], a[c] = d;
                    return a
                }, a.flatten = c = function (a) {
                    var b, d, e, f;
                    d = [];
                    for (e = 0, f = a.length; e < f; e++)b = a[e], b instanceof Array ? d = d.concat(c(b)) : d.push(b);
                    return d
                }, a.del = function (a, b) {
                    var c;
                    return c = a[b], delete a[b], c
                }, a.last = function (a, b) {
                    return a[a.length - (b || 0) - 1]
                }, a.some = (d = Array.prototype.some) != null ? d : function (a) {
                    var b, c, d;
                    for (c = 0, d = this.length; c < d; c++) {
                        b = this[c];
                        if (a(b))return!0
                    }
                    return!1
                }
            })).call(this)
        }, require["./rewriter"] = new function () {
            var a = this;
            ((function () {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = [].indexOf || function (a) {
                    for (var b = 0, c = this.length; b < c; b++)if (b in this && this[b] === a)return b;
                    return-1
                }, u = [].slice;
                a.Rewriter = function () {
                    function a() {
                    }

                    return a.prototype.rewrite = function (a) {
                        return this.tokens = a, this.removeLeadingNewlines(), this.removeMidExpressionNewlines(), this.closeOpenCalls(), this.closeOpenIndexes(), this.addImplicitIndentation(), this.tagPostfixConditionals(), this.addImplicitBraces(), this.addImplicitParentheses(), this.tokens
                    }, a.prototype.scanTokens = function (a) {
                        var b, c, d;
                        d = this.tokens, b = 0;
                        while (c = d[b])b += a.call(this, c, b, d);
                        return!0
                    }, a.prototype.detectEnd = function (a, b, c) {
                        var f, g, h, i, j;
                        h = this.tokens, f = 0;
                        while (g = h[a]) {
                            if (f === 0 && b.call(this, g, a))return c.call(this, g, a);
                            if (!g || f < 0)return c.call(this, g, a - 1);
                            if (i = g[0], t.call(e, i) >= 0)f += 1; else if (j = g[0], t.call(d, j) >= 0)f -= 1;
                            a += 1
                        }
                        return a - 1
                    }, a.prototype.removeLeadingNewlines = function () {
                        var a, b, c, d, e;
                        e = this.tokens;
                        for (a = c = 0, d = e.length; c < d; a = ++c) {
                            b = e[a][0];
                            if (b !== "TERMINATOR")break
                        }
                        if (a)return this.tokens.splice(0, a)
                    }, a.prototype.removeMidExpressionNewlines = function () {
                        return this.scanTokens(function (a, b, d) {
                            var e;
                            return a[0] === "TERMINATOR" && (e = this.tag(b + 1), t.call(c, e) >= 0) ? (d.splice(b, 1), 0) : 1
                        })
                    }, a.prototype.closeOpenCalls = function () {
                        var a, b;
                        return b = function (a, b) {
                            var c;
                            return(c = a[0]) === ")" || c === "CALL_END" || a[0] === "OUTDENT" && this.tag(b - 1) === ")"
                        }, a = function (a, b) {
                            return this.tokens[a[0] === "OUTDENT" ? b - 1 : b][0] = "CALL_END"
                        }, this.scanTokens(function (c, d) {
                            return c[0] === "CALL_START" && this.detectEnd(d + 1, b, a), 1
                        })
                    }, a.prototype.closeOpenIndexes = function () {
                        var a, b;
                        return b = function (a, b) {
                            var c;
                            return(c = a[0]) === "]" || c === "INDEX_END"
                        }, a = function (a, b) {
                            return a[0] = "INDEX_END"
                        }, this.scanTokens(function (c, d) {
                            return c[0] === "INDEX_START" && this.detectEnd(d + 1, b, a), 1
                        })
                    }, a.prototype.addImplicitBraces = function () {
                        var a, b, c, f, g, i, j, k;
                        return f = [], g = null, k = null, c = !0, i = 0, j = 0, b = function (a, b) {
                            var d, e, f, g, i, m;
                            return i = this.tokens.slice(b + 1, +(b + 3) + 1 || 9e9), d = i[0], g = i[1], f = i[2], "HERECOMMENT" === (d != null ? d[0] : void 0) ? !1 : (e = a[0], t.call(l, e) >= 0 && (c = !1), (e === "TERMINATOR" || e === "OUTDENT" || t.call(h, e) >= 0 && c && b - j !== 1) && (!k && this.tag(b - 1) !== "," || (g != null ? g[0] : void 0) !== ":" && ((d != null ? d[0] : void 0) !== "@" || (f != null ? f[0] : void 0) !== ":")) || e === "," && d && (m = d[0]) !== "IDENTIFIER" && m !== "NUMBER" && m !== "STRING" && m !== "@" && m !== "TERMINATOR" && m !== "OUTDENT")
                        }, a = function (a, b) {
                            var c;
                            return c = this.generate("}", "}", a[2]), this.tokens.splice(b, 0, c)
                        }, this.scanTokens(function (h, i, m) {
                            var n, o, p, q, r, s, u, v;
                            if (u = q = h[0], t.call(e, u) >= 0)return f.push([q === "INDENT" && this.tag(i - 1) === "{" ? "{" : q, i]), 1;
                            if (t.call(d, q) >= 0)return g = f.pop(), 1;
                            if (q !== ":" || (n = this.tag(i - 2)) !== ":" && ((v = f[f.length - 1]) != null ? v[0] : void 0) === "{")return 1;
                            c = !0, j = i + 1, f.push(["{"]), o = n === "@" ? i - 2 : i - 1;
                            while (this.tag(o - 2) === "HERECOMMENT")o -= 2;
                            return p = this.tag(o - 1), k = !p || t.call(l, p) >= 0, s = new String("{"), s.generated = !0, r = this.generate("{", s, h[2]), m.splice(o, 0, r), this.detectEnd(i + 2, b, a), 2
                        })
                    }, a.prototype.addImplicitParentheses = function () {
                        var a, b, c, d, e;
                        return c = e = d = !1, b = function (a, b) {
                            var c, g, i, j;
                            g = a[0];
                            if (!e && a.fromThen)return!0;
                            if (g === "IF" || g === "ELSE" || g === "CATCH" || g === "->" || g === "=>" || g === "CLASS")e = !0;
                            if (g === "IF" || g === "ELSE" || g === "SWITCH" || g === "TRY" || g === "=")d = !0;
                            return g !== "." && g !== "?." && g !== "::" || this.tag(b - 1) !== "OUTDENT" ? !a.generated && this.tag(b - 1) !== "," && (t.call(h, g) >= 0 || g === "INDENT" && !d) && (g !== "INDENT" || (i = this.tag(b - 2)) !== "CLASS" && i !== "EXTENDS" && (j = this.tag(b - 1), t.call(f, j) < 0) && (!(c = this.tokens[b + 1]) || !c.generated || c[0] !== "{")) : !0
                        }, a = function (a, b) {
                            return this.tokens.splice(b, 0, this.generate("CALL_END", ")", a[2]))
                        }, this.scanTokens(function (f, h, k) {
                            var m, n, o, p, q, r, s, u;
                            q = f[0];
                            if (q === "CLASS" || q === "IF" || q === "FOR" || q === "WHILE")c = !0;
                            return r = k.slice(h - 1, +(h + 1) + 1 || 9e9), p = r[0], n = r[1], o = r[2], m = !c && q === "INDENT" && o && o.generated && o[0] === "{" && p && (s = p[0], t.call(i, s) >= 0), e = !1, d = !1, t.call(l, q) >= 0 && (c = !1), p && !p.spaced && q === "?" && (f.call = !0), f.fromThen ? 1 : m || (p != null ? p.spaced : void 0) && (p.call || (u = p[0], t.call(i, u) >= 0)) && (t.call(g, q) >= 0 || !f.spaced && !f.newLine && t.call(j, q) >= 0) ? (k.splice(h, 0, this.generate("CALL_START", "(", f[2])), this.detectEnd(h + 1, b, a), p[0] === "?" && (p[0] = "FUNC_EXIST"), 2) : 1
                        })
                    }, a.prototype.addImplicitIndentation = function () {
                        var a, b, c, d, e;
                        return e = c = d = null, b = function (a, b) {
                            var c;
                            return a[1] !== ";" && (c = a[0], t.call(m, c) >= 0) && (a[0] !== "ELSE" || e === "IF" || e === "THEN")
                        }, a = function (a, b) {
                            return this.tokens.splice(this.tag(b - 1) === "," ? b - 1 : b, 0, d)
                        }, this.scanTokens(function (f, g, h) {
                            var i, j, k;
                            return i = f[0], i === "TERMINATOR" && this.tag(g + 1) === "THEN" ? (h.splice(g, 1), 0) : i === "ELSE" && this.tag(g - 1) !== "OUTDENT" ? (h.splice.apply(h, [g, 0].concat(u.call(this.indentation(f)))), 2) : i !== "CATCH" || (j = this.tag(g + 2)) !== "OUTDENT" && j !== "TERMINATOR" && j !== "FINALLY" ? t.call(n, i) >= 0 && this.tag(g + 1) !== "INDENT" && (i !== "ELSE" || this.tag(g + 1) !== "IF") ? (e = i, k = this.indentation(f, !0), c = k[0], d = k[1], e === "THEN" && (c.fromThen = !0), h.splice(g + 1, 0, c), this.detectEnd(g + 2, b, a), i === "THEN" && h.splice(g, 1), 1) : 1 : (h.splice.apply(h, [g + 2, 0].concat(u.call(this.indentation(f)))), 4)
                        })
                    }, a.prototype.tagPostfixConditionals = function () {
                        var a, b, c;
                        return c = null, b = function (a, b) {
                            var c;
                            return(c = a[0]) === "TERMINATOR" || c === "INDENT"
                        }, a = function (a, b) {
                            if (a[0] !== "INDENT" || a.generated && !a.fromThen)return c[0] = "POST_" + c[0]
                        }, this.scanTokens(function (d, e) {
                            return d[0] !== "IF" ? 1 : (c = d, this.detectEnd(e + 1, b, a), 1)
                        })
                    }, a.prototype.indentation = function (a, b) {
                        var c, d;
                        return b == null && (b = !1), c = ["INDENT", 2, a[2]], d = ["OUTDENT", 2, a[2]], b && (c.generated = d.generated = !0), [c, d]
                    }, a.prototype.generate = function (a, b, c) {
                        var d;
                        return d = [a, b, c], d.generated = !0, d
                    }, a.prototype.tag = function (a) {
                        var b;
                        return(b = this.tokens[a]) != null ? b[0] : void 0
                    }, a
                }(), b = [
                    ["(", ")"],
                    ["[", "]"],
                    ["{", "}"],
                    ["INDENT", "OUTDENT"],
                    ["CALL_START", "CALL_END"],
                    ["PARAM_START", "PARAM_END"],
                    ["INDEX_START", "INDEX_END"]
                ], a.INVERSES = k = {}, e = [], d = [];
                for (q = 0, r = b.length; q < r; q++)s = b[q], o = s[0], p = s[1], e.push(k[p] = o), d.push(k[o] = p);
                c = ["CATCH", "WHEN", "ELSE", "FINALLY"].concat(d), i = ["IDENTIFIER", "SUPER", ")", "CALL_END", "]", "INDEX_END", "@", "THIS"], g = ["IDENTIFIER", "NUMBER", "STRING", "JS", "REGEX", "NEW", "PARAM_START", "CLASS", "IF", "TRY", "SWITCH", "THIS", "BOOL", "NULL", "UNDEFINED", "UNARY", "SUPER", "@", "->", "=>", "[", "(", "{", "--", "++"], j = ["+", "-"], f = ["->", "=>", "{", "[", ","], h = ["POST_IF", "FOR", "WHILE", "UNTIL", "WHEN", "BY", "LOOP", "TERMINATOR"], n = ["ELSE", "->", "=>", "TRY", "FINALLY", "THEN"], m = ["TERMINATOR", "CATCH", "FINALLY", "ELSE", "OUTDENT", "LEADING_WHEN"], l = ["TERMINATOR", "INDENT", "OUTDENT"]
            })).call(this)
        }, require["./lexer"] = new function () {
            var a = this;
            ((function () {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X = [].indexOf || function (a) {
                    for (var b = 0, c = this.length; b < c; b++)if (b in this && this[b] === a)return b;
                    return-1
                };
                V = require("./rewriter"), J = V.Rewriter, r = V.INVERSES, W = require("./helpers"), R = W.count, U = W.starts, Q = W.compact, T = W.last, a.Lexer = y = function () {
                    function a() {
                    }

                    return a.prototype.tokenize = function (a, b) {
                        var c, d;
                        b == null && (b = {}), P.test(a) && (a = "\n" + a), a = a.replace(/\r/g, "").replace(N, ""), this.code = a, this.line = b.line || 0, this.indent = 0, this.indebt = 0, this.outdebt = 0, this.indents = [], this.ends = [], this.tokens = [], c = 0;
                        while (this.chunk = a.slice(c))c += this.identifierToken() || this.commentToken() || this.whitespaceToken() || this.lineToken() || this.heredocToken() || this.stringToken() || this.numberToken() || this.regexToken() || this.jsToken() || this.literalToken();
                        return this.closeIndentation(), (d = this.ends.pop()) && this.error("missing " + d), b.rewrite === !1 ? this.tokens : (new J).rewrite(this.tokens)
                    }, a.prototype.identifierToken = function () {
                        var a, b, c, d, h, i, j, k, l;
                        return(h = p.exec(this.chunk)) ? (d = h[0], c = h[1], a = h[2], c === "own" && this.tag() === "FOR" ? (this.token("OWN", c), c.length) : (b = a || (i = T(this.tokens)) && ((k = i[0]) === "." || k === "?." || k === "::" || !i.spaced && i[0] === "@"), j = "IDENTIFIER", !b && (X.call(u, c) >= 0 || X.call(g, c) >= 0) && (j = c.toUpperCase(), j === "WHEN" && (l = this.tag(), X.call(v, l) >= 0) ? j = "LEADING_WHEN" : j === "FOR" ? this.seenFor = !0 : j === "UNLESS" ? j = "IF" : X.call(O, j) >= 0 ? j = "UNARY" : X.call(H, j) >= 0 && (j !== "INSTANCEOF" && this.seenFor ? (j = "FOR" + j, this.seenFor = !1) : (j = "RELATION", this.value() === "!" && (this.tokens.pop(), c = "!" + c)))), X.call(t, c) >= 0 && (b ? (j = "IDENTIFIER", c = new String(c), c.reserved = !0) : X.call(I, c) >= 0 && this.error('reserved word "' + c + '"')), b || (X.call(e, c) >= 0 && (c = f[c]), j = function () {
                            switch (c) {
                                case"!":
                                    return"UNARY";
                                case"==":
                                case"!=":
                                    return"COMPARE";
                                case"&&":
                                case"||":
                                    return"LOGIC";
                                case"true":
                                case"false":
                                    return"BOOL";
                                case"break":
                                case"continue":
                                    return"STATEMENT";
                                default:
                                    return j
                            }
                        }()), this.token(j, c), a && this.token(":", ":"), d.length)) : 0
                    }, a.prototype.numberToken = function () {
                        var a, b, c, d, e;
                        if (!(c = E.exec(this.chunk)))return 0;
                        d = c[0], /^0[BOX]/.test(d) ? this.error("radix prefix '" + d + "' must be lowercase") : /E/.test(d) && !/^0x/.test(d) ? this.error("exponential notation '" + d + "' must be indicated with a lowercase 'e'") : /^0\d*[89]/.test(d) ? this.error("decimal literal '" + d + "' must not be prefixed with '0'") : /^0\d+/.test(d) && this.error("octal literal '" + d + "' must be prefixed with '0o'"), b = d.length;
                        if (e = /^0o([0-7]+)/.exec(d))d = "0x" + parseInt(e[1], 8).toString(16);
                        if (a = /^0b([01]+)/.exec(d))d = "0x" + parseInt(a[1], 2).toString(16);
                        return this.token("NUMBER", d), b
                    }, a.prototype.stringToken = function () {
                        var a, b, c;
                        switch (this.chunk.charAt(0)) {
                            case"'":
                                if (!(a = L.exec(this.chunk)))return 0;
                                this.token("STRING", (c = a[0]).replace(A, "\\\n"));
                                break;
                            case'"':
                                if (!(c = this.balancedString(this.chunk, '"')))return 0;
                                0 < c.indexOf("#{",1)?this.interpolateString(c.slice(1,-1)):this.token("STRING", this.escapeLines(c));
                                break;
                            default:
                                return 0
                        }
                        return(b = /^(?:\\.|[^\\])*\\(?:0[0-7]|[1-7])/.test(c)) && this.error("octal escape sequences " + c + " are not allowed"), this.line += R(c, "\n"), c.length
                    }, a.prototype.heredocToken = function () {
                        var a, b, c, d;
                        return(c = k.exec(this.chunk)) ? (b = c[0], d = b.charAt(0), a = this.sanitizeHeredoc(c[2], {quote: d, indent: null}), d === '"' && 0 <= a.indexOf("#{")?this.interpolateString(a,{heredoc:!0}):this.token("STRING",this.makeString(a,d,!0)),this.line+=R(b,"\n"), b.length) : 0
                    }, a.prototype.commentToken = function () {
                        var a, b, c;
                        return(c = this.chunk.match(h)) ? (a = c[0], b = c[1], b && this.token("HERECOMMENT", this.sanitizeHeredoc(b, {herecomment: !0, indent: Array(this.indent + 1).join(" ")})), this.line += R(a, "\n"), a.length) : 0
                    }, a.prototype.jsToken = function () {
                        var a, b;
                        return this.chunk.charAt(0) !== "`" || !(a = s.exec(this.chunk)) ? 0 : (this.token("JS", (b = a[0]).slice(1, -1)), this.line += R(b, "\n"), b.length)
                    }, a.prototype.regexToken = function () {
                        var a, b, c, d, e, f, g;
                        return this.chunk.charAt(0) !== "/" ? 0 : (c = n.exec(this.chunk)) ? (b = this.heregexToken(c), this.line += R(c[0], "\n"), b) : (d = T(this.tokens), d && (f = d[0], X.call(d.spaced ? C : D, f) >= 0) ? 0 : (c = G.exec(this.chunk)) ? (g = c, c = g[0], e = g[1], a = g[2], e.slice(0, 2) === "/*" && this.error("regular expressions cannot begin with `*`"), e === "//" && (e = "/(?:)/"), this.token("REGEX", "" + e + a), c.length) : 0)
                    }, a.prototype.heregexToken = function (a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, n;
                        d = a[0], b = a[1], c = a[2];
                        if (0 > b.indexOf("#{"))return e=b.replace(o,"").replace(/\//g,"\\/"),e.match(/^\*/)&&this.error("regular expressions cannot begin with `*`"),this.token("REGEX","/"+(e||"(?:)")+"/" + c), d.length;
                        this.token("IDENTIFIER", "RegExp"), this.tokens.push(["CALL_START", "("]), g = [], k = this.interpolateString(b, {regex: !0});
                        for (i = 0, j = k.length; i < j; i++) {
                            l = k[i], f = l[0], h = l[1];
                            if (f === "TOKENS")g.push.apply(g, h); else {
                                if (!(h = h.replace(o, "")))continue;
                                h = h.replace(/\\/g, "\\\\"), g.push(["STRING", this.makeString(h, '"', !0)])
                            }
                            g.push(["+", "+"])
                        }
                        return g.pop(), ((m = g[0]) != null ? m[0] : void 0) !== "STRING" && this.tokens.push(["STRING", '""'], ["+", "+"]), (n = this.tokens).push.apply(n, g), c && this.tokens.push([",", ","], ["STRING", '"' + c + '"']), this.token(")", ")"), d.length
                    }, a.prototype.lineToken = function () {
                        var a, b, c, d, e;
                        if (!(c = B.exec(this.chunk)))return 0;
                        b = c[0], this.line += R(b, "\n"), this.seenFor = !1, e = b.length - 1 - b.lastIndexOf("\n"), d = this.unfinished();
                        if (e - this.indebt === this.indent)return d ? this.suppressNewlines() : this.newlineToken(), b.length;
                        if (e > this.indent) {
                            if (d)return this.indebt = e - this.indent, this.suppressNewlines(), b.length;
                            a = e - this.indent + this.outdebt, this.token("INDENT", a), this.indents.push(a), this.ends.push("OUTDENT"), this.outdebt = this.indebt = 0
                        } else this.indebt = 0, this.outdentToken(this.indent - e, d);
                        return this.indent = e, b.length
                    }, a.prototype.outdentToken = function (a, b) {
                        var c, d;
                        while (a > 0)d = this.indents.length - 1, this.indents[d] === void 0 ? a = 0 : this.indents[d] === this.outdebt ? (a -= this.outdebt, this.outdebt = 0) : this.indents[d] < this.outdebt ? (this.outdebt -= this.indents[d], a -= this.indents[d]) : (c = this.indents.pop() - this.outdebt, a -= c, this.outdebt = 0, this.pair("OUTDENT"), this.token("OUTDENT", c));
                        c && (this.outdebt -= a);
                        while (this.value() === ";")this.tokens.pop();
                        return this.tag() !== "TERMINATOR" && !b && this.token("TERMINATOR", "\n"), this
                    }, a.prototype.whitespaceToken = function () {
                        var a, b, c;
                        return!(a = P.exec(this.chunk)) && !(b = this.chunk.charAt(0) === "\n") ? 0 : (c = T(this.tokens), c && (c[a ? "spaced" : "newLine"] = !0), a ? a[0].length : 0)
                    }, a.prototype.newlineToken = function () {
                        while (this.value() === ";")this.tokens.pop();
                        return this.tag() !== "TERMINATOR" && this.token("TERMINATOR", "\n"), this
                    }, a.prototype.suppressNewlines = function () {
                        return this.value() === "\\" && this.tokens.pop(), this
                    }, a.prototype.literalToken = function () {
                        var a, b, e, f, g, h, k, l;
                        (a = F.exec(this.chunk)) ? (f = a[0], d.test(f) && this.tagParameters()) : f = this.chunk.charAt(0), e = f, b = T(this.tokens);
                        if (f === "=" && b) {
                            !b[1].reserved && (g = b[1], X.call(t, g) >= 0) && this.error('reserved word "' + this.value() + "\" can't be assigned");
                            if ((h = b[1]) === "||" || h === "&&")return b[0] = "COMPOUND_ASSIGN", b[1] += "=", f.length
                        }
                        if (f === ";")this.seenFor = !1, e = "TERMINATOR"; else if (X.call(z, f) >= 0)e = "MATH"; else if (X.call(i, f) >= 0)e = "COMPARE"; else if (X.call(j, f) >= 0)e = "COMPOUND_ASSIGN"; else if (X.call(O, f) >= 0)e = "UNARY"; else if (X.call(K, f) >= 0)e = "SHIFT"; else if (X.call(x, f) >= 0 || f === "?" && (b != null ? b.spaced : void 0))e = "LOGIC"; else if (b && !b.spaced)if (f === "(" && (k = b[0], X.call(c, k) >= 0))b[0] === "?" && (b[0] = "FUNC_EXIST"), e = "CALL_START"; else if (f === "[" && (l = b[0], X.call(q, l) >= 0)) {
                            e = "INDEX_START";
                            switch (b[0]) {
                                case"?":
                                    b[0] = "INDEX_SOAK"
                            }
                        }
                        switch (f) {
                            case"(":
                            case"{":
                            case"[":
                                this.ends.push(r[f]);
                                break;
                            case")":
                            case"}":
                            case"]":
                                this.pair(f)
                        }
                        return this.token(e, f), f.length
                    }, a.prototype.sanitizeHeredoc = function (a, b) {
                        var c, d, e, f, g;
                        e = b.indent, d = b.herecomment;
                        if (d) {
                            l.test(a) && this.error('block comment cannot contain "*/", starting');
                            if (a.indexOf("\n") <= 0)return a
                        } else while (f = m.exec(a)) {
                            c = f[1];
                            if (e === null || 0 < (g = c.length) && g < e.length)e = c
                        }
                        return e && (a = a.replace(RegExp("\\n" + e, "g"), "\n")), d || (a = a.replace(/^\n/, "")), a
                    }, a.prototype.tagParameters = function () {
                        var a, b, c, d;
                        if (this.tag() !== ")")return this;
                        b = [], d = this.tokens, a = d.length, d[--a][0] = "PARAM_END";
                        while (c = d[--a])switch (c[0]) {
                            case")":
                                b.push(c);
                                break;
                            case"(":
                            case"CALL_START":
                                if (b.length)b.pop(); else return c[0] === "(" ? (c[0] = "PARAM_START", this) : this
                        }
                        return this
                    }, a.prototype.closeIndentation = function () {
                        return this.outdentToken(this.indent)
                    }, a.prototype.balancedString = function (a, b) {
                        var c, d, e, f, g, h, i, j;
                        c = 0, h = [b];
                        for (d = i = 1, j = a.length; 1 <= j ? i < j : i > j; d = 1 <= j ? ++i : --i) {
                            if (c) {
                                --c;
                                continue
                            }
                            switch (e = a.charAt(d)) {
                                case"\\":
                                    ++c;
                                    continue;
                                case b:
                                    h.pop();
                                    if (!h.length)return a.slice(0, +d + 1 || 9e9);
                                    b = h[h.length - 1];
                                    continue
                            }
                            b !== "}" || e !== '"' && e !== "'" ? b === "}" && e === "/" && (f = n.exec(a.slice(d)) || G.exec(a.slice(d))) ? c += f[0].length - 1 : b === "}" && e === "{" ? h.push(b = "}") : b === '"' && g === "#" && e === "{" && h.push(b = "}") : h.push(b = e), g = e
                        }
                        return this.error("missing " + h.pop() + ", starting")
                    }, a.prototype.interpolateString = function (b, c) {
                        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
                        c == null && (c = {}), e = c.heredoc, m = c.regex, o = [], l = 0, f = -1;
                        while (j = b.charAt(f += 1)) {
                            if (j === "\\") {
                                f += 1;
                                continue
                            }
                            if (j !== "#" || b.charAt(f + 1) !== "{" || !(d = this.balancedString(b.slice(f + 1), "}")))continue;
                            l < f && o.push(["NEOSTRING", b.slice(l, f)]), g = d.slice(1, -1);
                            if (g.length) {
                                k = (new a).tokenize(g, {line: this.line, rewrite: !1}), k.pop(), ((s = k[0]) != null ? s[0] : void 0) === "TERMINATOR" && k.shift();
                                if (i = k.length)i > 1 && (k.unshift(["(", "(", this.line]), k.push([")", ")", this.line])), o.push(["TOKENS", k])
                            }
                            f += d.length, l = f + 1
                        }
                        f > l && l < b.length && o.push(["NEOSTRING", b.slice(l)]);
                        if (m)return o;
                        if (!o.length)return this.token("STRING", '""');
                        o[0][0] !== "NEOSTRING" && o.unshift(["", ""]), (h = o.length > 1) && this.token("(", "(");
                        for (f = q = 0, r = o.length; q < r; f = ++q)t = o[f], n = t[0], p = t[1], f && this.token("+", "+"), n === "TOKENS" ? (u = this.tokens).push.apply(u, p) : this.token("STRING", this.makeString(p, '"', e));
                        return h && this.token(")", ")"), o
                    }, a.prototype.pair = function (a) {
                        var b, c;
                        return a !== (c = T(this.ends)) ? ("OUTDENT" !== c && this.error("unmatched " + a), this.indent -= b = T(this.indents), this.outdentToken(b, !0), this.pair(a)) : this.ends.pop()
                    }, a.prototype.token = function (a, b) {
                        return this.tokens.push([a, b, this.line])
                    }, a.prototype.tag = function (a, b) {
                        var c;
                        return(c = T(this.tokens, a)) && (b ? c[0] = b : c[0])
                    }, a.prototype.value = function (a, b) {
                        var c;
                        return(c = T(this.tokens, a)) && (b ? c[1] = b : c[1])
                    }, a.prototype.unfinished = function () {
                        var a;
                        return w.test(this.chunk) || (a = this.tag()) === "\\" || a === "." || a === "?." || a === "UNARY" || a === "MATH" || a === "+" || a === "-" || a === "SHIFT" || a === "RELATION" || a === "COMPARE" || a === "LOGIC" || a === "THROW" || a === "EXTENDS"
                    }, a.prototype.escapeLines = function (a, b) {
                        return a.replace(A, b ? "\\n" : "")
                    }, a.prototype.makeString = function (a, b, c) {
                        return a ? (a = a.replace(/\\([\s\S])/g, function (a, c) {
                            return c === "\n" || c === b ? c : a
                        }), a = a.replace(RegExp("" + b, "g"), "\\$&"), b + this.escapeLines(a, c) + b) : b + b
                    }, a.prototype.error = function (a) {
                        throw SyntaxError("" + a + " on line " + (this.line + 1))
                    }, a
                }(), u = ["true", "false", "null", "this", "new", "delete", "typeof", "in", "instanceof", "return", "throw", "break", "continue", "debugger", "if", "else", "switch", "for", "while", "do", "try", "catch", "finally", "class", "extends", "super"], g = ["undefined", "then", "unless", "until", "loop", "of", "by", "when"], f = {and: "&&", or: "||", is: "==", isnt: "!=", not: "!", yes: "true", no: "false", on: "true", off: "false"}, e = function () {
                    var a;
                    a = [];
                    for (S in f)a.push(S);
                    return a
                }(), g = g.concat(e), I = ["case", "default", "function", "var", "void", "with", "const", "let", "enum", "export", "import", "native", "__hasProp", "__extends", "__slice", "__bind", "__indexOf", "implements", "interface", "package", "private", "protected", "public", "static", "yield"], M = ["arguments", "eval"], t = u.concat(I).concat(M), a.RESERVED = I.concat(u).concat(g).concat(M), a.STRICT_PROSCRIBED = M, p = /^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?/, E = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i, k = /^("""|''')([\s\S]*?)(?:\n[^\n\S]*)?\1/, F = /^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?\.|\.{2,3})/, P = /^[^\n\S]+/, h = /^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)?$)|^(?:\s*#(?!##[^#]).*)+/, d = /^[-=]>/, B = /^(?:\n[^\n\S]*)+/, L = /^'[^\\']*(?:\\.[^\\']*)*'/, s = /^`[^\\`]*(?:\\.[^\\`]*)*`/, G = /^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/, n = /^\/{3}([\s\S]+?)\/{3}([imgy]{0,4})(?!\w)/, o = /\s+(?:#.*)?/g, A = /\n/g, m = /\n+([^\n\S]*)/g, l = /\*\//, w = /^\s*(?:,|\??\.(?![.\d])|::)/, N = /\s+$/, j = ["-=", "+=", "/=", "*=", "%=", "||=", "&&=", "?=", "<<=", ">>=", ">>>=", "&=", "^=", "|="], O = ["!", "~", "NEW", "TYPEOF", "DELETE", "DO"], x = ["&&", "||", "&", "|", "^"], K = ["<<", ">>", ">>>"], i = ["==", "!=", "<", ">", "<=", ">="], z = ["*", "/", "%"], H = ["IN", "OF", "INSTANCEOF"], b = ["TRUE", "FALSE"], C = ["NUMBER", "REGEX", "BOOL", "NULL", "UNDEFINED", "++", "--", "]"], D = C.concat(")", "}", "THIS", "IDENTIFIER", "STRING"), c = ["IDENTIFIER", "STRING", "REGEX", ")", "]", "}", "?", "::", "@", "THIS", "SUPER"], q = c.concat("NUMBER", "BOOL", "NULL", "UNDEFINED"), v = ["INDENT", "OUTDENT", "TERMINATOR"]
            })).call(this)
        }, require["./parser"] = new function () {
            var a = this, b = function () {
                var a = {trace: function () {
                }, yy: {}, symbols_: {error: 2, Root: 3, Body: 4, Block: 5, TERMINATOR: 6, Line: 7, Expression: 8, Statement: 9, Return: 10, Comment: 11, STATEMENT: 12, Value: 13, Invocation: 14, Code: 15, Operation: 16, Assign: 17, If: 18, Try: 19, While: 20, For: 21, Switch: 22, Class: 23, Throw: 24, INDENT: 25, OUTDENT: 26, Identifier: 27, IDENTIFIER: 28, AlphaNumeric: 29, NUMBER: 30, STRING: 31, Literal: 32, JS: 33, REGEX: 34, DEBUGGER: 35, UNDEFINED: 36, NULL: 37, BOOL: 38, Assignable: 39, "=": 40, AssignObj: 41, ObjAssignable: 42, ":": 43, ThisProperty: 44, RETURN: 45, HERECOMMENT: 46, PARAM_START: 47, ParamList: 48, PARAM_END: 49, FuncGlyph: 50, "->": 51, "=>": 52, OptComma: 53, ",": 54, Param: 55, ParamVar: 56, "...": 57, Array: 58, Object: 59, Splat: 60, SimpleAssignable: 61, Accessor: 62, Parenthetical: 63, Range: 64, This: 65, ".": 66, "?.": 67, "::": 68, Index: 69, INDEX_START: 70, IndexValue: 71, INDEX_END: 72, INDEX_SOAK: 73, Slice: 74, "{": 75, AssignList: 76, "}": 77, CLASS: 78, EXTENDS: 79, OptFuncExist: 80, Arguments: 81, SUPER: 82, FUNC_EXIST: 83, CALL_START: 84, CALL_END: 85, ArgList: 86, THIS: 87, "@": 88, "[": 89, "]": 90, RangeDots: 91, "..": 92, Arg: 93, SimpleArgs: 94, TRY: 95, Catch: 96, FINALLY: 97, CATCH: 98, THROW: 99, "(": 100, ")": 101, WhileSource: 102, WHILE: 103, WHEN: 104, UNTIL: 105, Loop: 106, LOOP: 107, ForBody: 108, FOR: 109, ForStart: 110, ForSource: 111, ForVariables: 112, OWN: 113, ForValue: 114, FORIN: 115, FOROF: 116, BY: 117, SWITCH: 118, Whens: 119, ELSE: 120, When: 121, LEADING_WHEN: 122, IfBlock: 123, IF: 124, POST_IF: 125, UNARY: 126, "-": 127, "+": 128, "--": 129, "++": 130, "?": 131, MATH: 132, SHIFT: 133, COMPARE: 134, LOGIC: 135, RELATION: 136, COMPOUND_ASSIGN: 137, $accept: 0, $end: 1}, terminals_: {2: "error", 6: "TERMINATOR", 12: "STATEMENT", 25: "INDENT", 26: "OUTDENT", 28: "IDENTIFIER", 30: "NUMBER", 31: "STRING", 33: "JS", 34: "REGEX", 35: "DEBUGGER", 36: "UNDEFINED", 37: "NULL", 38: "BOOL", 40: "=", 43: ":", 45: "RETURN", 46: "HERECOMMENT", 47: "PARAM_START", 49: "PARAM_END", 51: "->", 52: "=>", 54: ",", 57: "...", 66: ".", 67: "?.", 68: "::", 70: "INDEX_START", 72: "INDEX_END", 73: "INDEX_SOAK", 75: "{", 77: "}", 78: "CLASS", 79: "EXTENDS", 82: "SUPER", 83: "FUNC_EXIST", 84: "CALL_START", 85: "CALL_END", 87: "THIS", 88: "@", 89: "[", 90: "]", 92: "..", 95: "TRY", 97: "FINALLY", 98: "CATCH", 99: "THROW", 100: "(", 101: ")", 103: "WHILE", 104: "WHEN", 105: "UNTIL", 107: "LOOP", 109: "FOR", 113: "OWN", 115: "FORIN", 116: "FOROF", 117: "BY", 118: "SWITCH", 120: "ELSE", 122: "LEADING_WHEN", 124: "IF", 125: "POST_IF", 126: "UNARY", 127: "-", 128: "+", 129: "--", 130: "++", 131: "?", 132: "MATH", 133: "SHIFT", 134: "COMPARE", 135: "LOGIC", 136: "RELATION", 137: "COMPOUND_ASSIGN"}, productions_: [0, [3, 0], [3, 1], [3, 2], [4, 1], [4, 3], [4, 2], [7, 1], [7, 1], [9, 1], [9, 1], [9, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [5, 2], [5, 3], [27, 1], [29, 1], [29, 1], [32, 1], [32, 1], [32, 1], [32, 1], [32, 1], [32, 1], [32, 1], [17, 3], [17, 4], [17, 5], [41, 1], [41, 3], [41, 5], [41, 1], [42, 1], [42, 1], [42, 1], [10, 2], [10, 1], [11, 1], [15, 5], [15, 2], [50, 1], [50, 1], [53, 0], [53, 1], [48, 0], [48, 1], [48, 3], [48, 4], [48, 6], [55, 1], [55, 2], [55, 3], [56, 1], [56, 1], [56, 1], [56, 1], [60, 2], [61, 1], [61, 2], [61, 2], [61, 1], [39, 1], [39, 1], [39, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [62, 2], [62, 2], [62, 2], [62, 1], [62, 1], [69, 3], [69, 2], [71, 1], [71, 1], [59, 4], [76, 0], [76, 1], [76, 3], [76, 4], [76, 6], [23, 1], [23, 2], [23, 3], [23, 4], [23, 2], [23, 3], [23, 4], [23, 5], [14, 3], [14, 3], [14, 1], [14, 2], [80, 0], [80, 1], [81, 2], [81, 4], [65, 1], [65, 1], [44, 2], [58, 2], [58, 4], [91, 1], [91, 1], [64, 5], [74, 3], [74, 2], [74, 2], [74, 1], [86, 1], [86, 3], [86, 4], [86, 4], [86, 6], [93, 1], [93, 1], [94, 1], [94, 3], [19, 2], [19, 3], [19, 4], [19, 5], [96, 3], [24, 2], [63, 3], [63, 5], [102, 2], [102, 4], [102, 2], [102, 4], [20, 2], [20, 2], [20, 2], [20, 1], [106, 2], [106, 2], [21, 2], [21, 2], [21, 2], [108, 2], [108, 2], [110, 2], [110, 3], [114, 1], [114, 1], [114, 1], [114, 1], [112, 1], [112, 3], [111, 2], [111, 2], [111, 4], [111, 4], [111, 4], [111, 6], [111, 6], [22, 5], [22, 7], [22, 4], [22, 6], [119, 1], [119, 2], [121, 3], [121, 4], [123, 3], [123, 5], [18, 1], [18, 3], [18, 3], [18, 3], [16, 2], [16, 2], [16, 2], [16, 2], [16, 2], [16, 2], [16, 2], [16, 2], [16, 3], [16, 3], [16, 3], [16, 3], [16, 3], [16, 3], [16, 3], [16, 3], [16, 5], [16, 3]], performAction: function (b, c, d, e, f, g, h) {
                    var i = g.length - 1;
                    switch (f) {
                        case 1:
                            return this.$ = new e.Block;
                        case 2:
                            return this.$ = g[i];
                        case 3:
                            return this.$ = g[i - 1];
                        case 4:
                            this.$ = e.Block.wrap([g[i]]);
                            break;
                        case 5:
                            this.$ = g[i - 2].push(g[i]);
                            break;
                        case 6:
                            this.$ = g[i - 1];
                            break;
                        case 7:
                            this.$ = g[i];
                            break;
                        case 8:
                            this.$ = g[i];
                            break;
                        case 9:
                            this.$ = g[i];
                            break;
                        case 10:
                            this.$ = g[i];
                            break;
                        case 11:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 12:
                            this.$ = g[i];
                            break;
                        case 13:
                            this.$ = g[i];
                            break;
                        case 14:
                            this.$ = g[i];
                            break;
                        case 15:
                            this.$ = g[i];
                            break;
                        case 16:
                            this.$ = g[i];
                            break;
                        case 17:
                            this.$ = g[i];
                            break;
                        case 18:
                            this.$ = g[i];
                            break;
                        case 19:
                            this.$ = g[i];
                            break;
                        case 20:
                            this.$ = g[i];
                            break;
                        case 21:
                            this.$ = g[i];
                            break;
                        case 22:
                            this.$ = g[i];
                            break;
                        case 23:
                            this.$ = g[i];
                            break;
                        case 24:
                            this.$ = new e.Block;
                            break;
                        case 25:
                            this.$ = g[i - 1];
                            break;
                        case 26:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 27:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 28:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 29:
                            this.$ = g[i];
                            break;
                        case 30:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 31:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 32:
                            this.$ = new e.Literal(g[i]);
                            break;
                        case 33:
                            this.$ = new e.Undefined;
                            break;
                        case 34:
                            this.$ = new e.Null;
                            break;
                        case 35:
                            this.$ = new e.Bool(g[i]);
                            break;
                        case 36:
                            this.$ = new e.Assign(g[i - 2], g[i]);
                            break;
                        case 37:
                            this.$ = new e.Assign(g[i - 3], g[i]);
                            break;
                        case 38:
                            this.$ = new e.Assign(g[i - 4], g[i - 1]);
                            break;
                        case 39:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 40:
                            this.$ = new e.Assign(new e.Value(g[i - 2]), g[i], "object");
                            break;
                        case 41:
                            this.$ = new e.Assign(new e.Value(g[i - 4]), g[i - 1], "object");
                            break;
                        case 42:
                            this.$ = g[i];
                            break;
                        case 43:
                            this.$ = g[i];
                            break;
                        case 44:
                            this.$ = g[i];
                            break;
                        case 45:
                            this.$ = g[i];
                            break;
                        case 46:
                            this.$ = new e.Return(g[i]);
                            break;
                        case 47:
                            this.$ = new e.Return;
                            break;
                        case 48:
                            this.$ = new e.Comment(g[i]);
                            break;
                        case 49:
                            this.$ = new e.Code(g[i - 3], g[i], g[i - 1]);
                            break;
                        case 50:
                            this.$ = new e.Code([], g[i], g[i - 1]);
                            break;
                        case 51:
                            this.$ = "func";
                            break;
                        case 52:
                            this.$ = "boundfunc";
                            break;
                        case 53:
                            this.$ = g[i];
                            break;
                        case 54:
                            this.$ = g[i];
                            break;
                        case 55:
                            this.$ = [];
                            break;
                        case 56:
                            this.$ = [g[i]];
                            break;
                        case 57:
                            this.$ = g[i - 2].concat(g[i]);
                            break;
                        case 58:
                            this.$ = g[i - 3].concat(g[i]);
                            break;
                        case 59:
                            this.$ = g[i - 5].concat(g[i - 2]);
                            break;
                        case 60:
                            this.$ = new e.Param(g[i]);
                            break;
                        case 61:
                            this.$ = new e.Param(g[i - 1], null, !0);
                            break;
                        case 62:
                            this.$ = new e.Param(g[i - 2], g[i]);
                            break;
                        case 63:
                            this.$ = g[i];
                            break;
                        case 64:
                            this.$ = g[i];
                            break;
                        case 65:
                            this.$ = g[i];
                            break;
                        case 66:
                            this.$ = g[i];
                            break;
                        case 67:
                            this.$ = new e.Splat(g[i - 1]);
                            break;
                        case 68:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 69:
                            this.$ = g[i - 1].add(g[i]);
                            break;
                        case 70:
                            this.$ = new e.Value(g[i - 1], [].concat(g[i]));
                            break;
                        case 71:
                            this.$ = g[i];
                            break;
                        case 72:
                            this.$ = g[i];
                            break;
                        case 73:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 74:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 75:
                            this.$ = g[i];
                            break;
                        case 76:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 77:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 78:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 79:
                            this.$ = g[i];
                            break;
                        case 80:
                            this.$ = new e.Access(g[i]);
                            break;
                        case 81:
                            this.$ = new e.Access(g[i], "soak");
                            break;
                        case 82:
                            this.$ = [new e.Access(new e.Literal("prototype")), new e.Access(g[i])];
                            break;
                        case 83:
                            this.$ = new e.Access(new e.Literal("prototype"));
                            break;
                        case 84:
                            this.$ = g[i];
                            break;
                        case 85:
                            this.$ = g[i - 1];
                            break;
                        case 86:
                            this.$ = e.extend(g[i], {soak: !0});
                            break;
                        case 87:
                            this.$ = new e.Index(g[i]);
                            break;
                        case 88:
                            this.$ = new e.Slice(g[i]);
                            break;
                        case 89:
                            this.$ = new e.Obj(g[i - 2], g[i - 3].generated);
                            break;
                        case 90:
                            this.$ = [];
                            break;
                        case 91:
                            this.$ = [g[i]];
                            break;
                        case 92:
                            this.$ = g[i - 2].concat(g[i]);
                            break;
                        case 93:
                            this.$ = g[i - 3].concat(g[i]);
                            break;
                        case 94:
                            this.$ = g[i - 5].concat(g[i - 2]);
                            break;
                        case 95:
                            this.$ = new e.Class;
                            break;
                        case 96:
                            this.$ = new e.Class(null, null, g[i]);
                            break;
                        case 97:
                            this.$ = new e.Class(null, g[i]);
                            break;
                        case 98:
                            this.$ = new e.Class(null, g[i - 1], g[i]);
                            break;
                        case 99:
                            this.$ = new e.Class(g[i]);
                            break;
                        case 100:
                            this.$ = new e.Class(g[i - 1], null, g[i]);
                            break;
                        case 101:
                            this.$ = new e.Class(g[i - 2], g[i]);
                            break;
                        case 102:
                            this.$ = new e.Class(g[i - 3], g[i - 1], g[i]);
                            break;
                        case 103:
                            this.$ = new e.Call(g[i - 2], g[i], g[i - 1]);
                            break;
                        case 104:
                            this.$ = new e.Call(g[i - 2], g[i], g[i - 1]);
                            break;
                        case 105:
                            this.$ = new e.Call("super", [new e.Splat(new e.Literal("arguments"))]);
                            break;
                        case 106:
                            this.$ = new e.Call("super", g[i]);
                            break;
                        case 107:
                            this.$ = !1;
                            break;
                        case 108:
                            this.$ = !0;
                            break;
                        case 109:
                            this.$ = [];
                            break;
                        case 110:
                            this.$ = g[i - 2];
                            break;
                        case 111:
                            this.$ = new e.Value(new e.Literal("this"));
                            break;
                        case 112:
                            this.$ = new e.Value(new e.Literal("this"));
                            break;
                        case 113:
                            this.$ = new e.Value(new e.Literal("this"), [new e.Access(g[i])], "this");
                            break;
                        case 114:
                            this.$ = new e.Arr([]);
                            break;
                        case 115:
                            this.$ = new e.Arr(g[i - 2]);
                            break;
                        case 116:
                            this.$ = "inclusive";
                            break;
                        case 117:
                            this.$ = "exclusive";
                            break;
                        case 118:
                            this.$ = new e.Range(g[i - 3], g[i - 1], g[i - 2]);
                            break;
                        case 119:
                            this.$ = new e.Range(g[i - 2], g[i], g[i - 1]);
                            break;
                        case 120:
                            this.$ = new e.Range(g[i - 1], null, g[i]);
                            break;
                        case 121:
                            this.$ = new e.Range(null, g[i], g[i - 1]);
                            break;
                        case 122:
                            this.$ = new e.Range(null, null, g[i]);
                            break;
                        case 123:
                            this.$ = [g[i]];
                            break;
                        case 124:
                            this.$ = g[i - 2].concat(g[i]);
                            break;
                        case 125:
                            this.$ = g[i - 3].concat(g[i]);
                            break;
                        case 126:
                            this.$ = g[i - 2];
                            break;
                        case 127:
                            this.$ = g[i - 5].concat(g[i - 2]);
                            break;
                        case 128:
                            this.$ = g[i];
                            break;
                        case 129:
                            this.$ = g[i];
                            break;
                        case 130:
                            this.$ = g[i];
                            break;
                        case 131:
                            this.$ = [].concat(g[i - 2], g[i]);
                            break;
                        case 132:
                            this.$ = new e.Try(g[i]);
                            break;
                        case 133:
                            this.$ = new e.Try(g[i - 1], g[i][0], g[i][1]);
                            break;
                        case 134:
                            this.$ = new e.Try(g[i - 2], null, null, g[i]);
                            break;
                        case 135:
                            this.$ = new e.Try(g[i - 3], g[i - 2][0], g[i - 2][1], g[i]);
                            break;
                        case 136:
                            this.$ = [g[i - 1], g[i]];
                            break;
                        case 137:
                            this.$ = new e.Throw(g[i]);
                            break;
                        case 138:
                            this.$ = new e.Parens(g[i - 1]);
                            break;
                        case 139:
                            this.$ = new e.Parens(g[i - 2]);
                            break;
                        case 140:
                            this.$ = new e.While(g[i]);
                            break;
                        case 141:
                            this.$ = new e.While(g[i - 2], {guard: g[i]});
                            break;
                        case 142:
                            this.$ = new e.While(g[i], {invert: !0});
                            break;
                        case 143:
                            this.$ = new e.While(g[i - 2], {invert: !0, guard: g[i]});
                            break;
                        case 144:
                            this.$ = g[i - 1].addBody(g[i]);
                            break;
                        case 145:
                            this.$ = g[i].addBody(e.Block.wrap([g[i - 1]]));
                            break;
                        case 146:
                            this.$ = g[i].addBody(e.Block.wrap([g[i - 1]]));
                            break;
                        case 147:
                            this.$ = g[i];
                            break;
                        case 148:
                            this.$ = (new e.While(new e.Literal("true"))).addBody(g[i]);
                            break;
                        case 149:
                            this.$ = (new e.While(new e.Literal("true"))).addBody(e.Block.wrap([g[i]]));
                            break;
                        case 150:
                            this.$ = new e.For(g[i - 1], g[i]);
                            break;
                        case 151:
                            this.$ = new e.For(g[i - 1], g[i]);
                            break;
                        case 152:
                            this.$ = new e.For(g[i], g[i - 1]);
                            break;
                        case 153:
                            this.$ = {source: new e.Value(g[i])};
                            break;
                        case 154:
                            this.$ = function () {
                                return g[i].own = g[i - 1].own, g[i].name = g[i - 1][0], g[i].index = g[i - 1][1], g[i]
                            }();
                            break;
                        case 155:
                            this.$ = g[i];
                            break;
                        case 156:
                            this.$ = function () {
                                return g[i].own = !0, g[i]
                            }();
                            break;
                        case 157:
                            this.$ = g[i];
                            break;
                        case 158:
                            this.$ = g[i];
                            break;
                        case 159:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 160:
                            this.$ = new e.Value(g[i]);
                            break;
                        case 161:
                            this.$ = [g[i]];
                            break;
                        case 162:
                            this.$ = [g[i - 2], g[i]];
                            break;
                        case 163:
                            this.$ = {source: g[i]};
                            break;
                        case 164:
                            this.$ = {source: g[i], object: !0};
                            break;
                        case 165:
                            this.$ = {source: g[i - 2], guard: g[i]};
                            break;
                        case 166:
                            this.$ = {source: g[i - 2], guard: g[i], object: !0};
                            break;
                        case 167:
                            this.$ = {source: g[i - 2], step: g[i]};
                            break;
                        case 168:
                            this.$ = {source: g[i - 4], guard: g[i - 2], step: g[i]};
                            break;
                        case 169:
                            this.$ = {source: g[i - 4], step: g[i - 2], guard: g[i]};
                            break;
                        case 170:
                            this.$ = new e.Switch(g[i - 3], g[i - 1]);
                            break;
                        case 171:
                            this.$ = new e.Switch(g[i - 5], g[i - 3], g[i - 1]);
                            break;
                        case 172:
                            this.$ = new e.Switch(null, g[i - 1]);
                            break;
                        case 173:
                            this.$ = new e.Switch(null, g[i - 3], g[i - 1]);
                            break;
                        case 174:
                            this.$ = g[i];
                            break;
                        case 175:
                            this.$ = g[i - 1].concat(g[i]);
                            break;
                        case 176:
                            this.$ = [
                                [g[i - 1], g[i]]
                            ];
                            break;
                        case 177:
                            this.$ = [
                                [g[i - 2], g[i - 1]]
                            ];
                            break;
                        case 178:
                            this.$ = new e.If(g[i - 1], g[i], {type: g[i - 2]});
                            break;
                        case 179:
                            this.$ = g[i - 4].addElse(new e.If(g[i - 1], g[i], {type: g[i - 2]}));
                            break;
                        case 180:
                            this.$ = g[i];
                            break;
                        case 181:
                            this.$ = g[i - 2].addElse(g[i]);
                            break;
                        case 182:
                            this.$ = new e.If(g[i], e.Block.wrap([g[i - 2]]), {type: g[i - 1], statement: !0});
                            break;
                        case 183:
                            this.$ = new e.If(g[i], e.Block.wrap([g[i - 2]]), {type: g[i - 1], statement: !0});
                            break;
                        case 184:
                            this.$ = new e.Op(g[i - 1], g[i]);
                            break;
                        case 185:
                            this.$ = new e.Op("-", g[i]);
                            break;
                        case 186:
                            this.$ = new e.Op("+", g[i]);
                            break;
                        case 187:
                            this.$ = new e.Op("--", g[i]);
                            break;
                        case 188:
                            this.$ = new e.Op("++", g[i]);
                            break;
                        case 189:
                            this.$ = new e.Op("--", g[i - 1], null, !0);
                            break;
                        case 190:
                            this.$ = new e.Op("++", g[i - 1], null, !0);
                            break;
                        case 191:
                            this.$ = new e.Existence(g[i - 1]);
                            break;
                        case 192:
                            this.$ = new e.Op("+", g[i - 2], g[i]);
                            break;
                        case 193:
                            this.$ = new e.Op("-", g[i - 2], g[i]);
                            break;
                        case 194:
                            this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                            break;
                        case 195:
                            this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                            break;
                        case 196:
                            this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                            break;
                        case 197:
                            this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                            break;
                        case 198:
                            this.$ = function () {
                                return g[i - 1].charAt(0) === "!" ? (new e.Op(g[i - 1].slice(1), g[i - 2], g[i])).invert() : new e.Op(g[i - 1], g[i - 2], g[i])
                            }();
                            break;
                        case 199:
                            this.$ = new e.Assign(g[i - 2], g[i], g[i - 1]);
                            break;
                        case 200:
                            this.$ = new e.Assign(g[i - 4], g[i - 1], g[i - 3]);
                            break;
                        case 201:
                            this.$ = new e.Extends(g[i - 2], g[i])
                    }
                }, table: [
                    {1: [2, 1], 3: 1, 4: 2, 5: 3, 7: 4, 8: 6, 9: 7, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 5], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [3]},
                    {1: [2, 2], 6: [1, 74]},
                    {6: [1, 75]},
                    {1: [2, 4], 6: [2, 4], 26: [2, 4], 101: [2, 4]},
                    {4: 77, 7: 4, 8: 6, 9: 7, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 26: [1, 76], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 7], 6: [2, 7], 26: [2, 7], 101: [2, 7], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 8], 6: [2, 8], 26: [2, 8], 101: [2, 8], 102: 90, 103: [1, 65], 105: [1, 66], 108: 91, 109: [1, 68], 110: 69, 125: [1, 89]},
                    {1: [2, 12], 6: [2, 12], 25: [2, 12], 26: [2, 12], 49: [2, 12], 54: [2, 12], 57: [2, 12], 62: 93, 66: [1, 95], 67: [1, 96], 68: [1, 97], 69: 98, 70: [1, 99], 72: [2, 12], 73: [1, 100], 77: [2, 12], 80: 92, 83: [1, 94], 84: [2, 107], 85: [2, 12], 90: [2, 12], 92: [2, 12], 101: [2, 12], 103: [2, 12], 104: [2, 12], 105: [2, 12], 109: [2, 12], 117: [2, 12], 125: [2, 12], 127: [2, 12], 128: [2, 12], 131: [2, 12], 132: [2, 12], 133: [2, 12], 134: [2, 12], 135: [2, 12], 136: [2, 12]},
                    {1: [2, 13], 6: [2, 13], 25: [2, 13], 26: [2, 13], 49: [2, 13], 54: [2, 13], 57: [2, 13], 62: 102, 66: [1, 95], 67: [1, 96], 68: [1, 97], 69: 98, 70: [1, 99], 72: [2, 13], 73: [1, 100], 77: [2, 13], 80: 101, 83: [1, 94], 84: [2, 107], 85: [2, 13], 90: [2, 13], 92: [2, 13], 101: [2, 13], 103: [2, 13], 104: [2, 13], 105: [2, 13], 109: [2, 13], 117: [2, 13], 125: [2, 13], 127: [2, 13], 128: [2, 13], 131: [2, 13], 132: [2, 13], 133: [2, 13], 134: [2, 13], 135: [2, 13], 136: [2, 13]},
                    {1: [2, 14], 6: [2, 14], 25: [2, 14], 26: [2, 14], 49: [2, 14], 54: [2, 14], 57: [2, 14], 72: [2, 14], 77: [2, 14], 85: [2, 14], 90: [2, 14], 92: [2, 14], 101: [2, 14], 103: [2, 14], 104: [2, 14], 105: [2, 14], 109: [2, 14], 117: [2, 14], 125: [2, 14], 127: [2, 14], 128: [2, 14], 131: [2, 14], 132: [2, 14], 133: [2, 14], 134: [2, 14], 135: [2, 14], 136: [2, 14]},
                    {1: [2, 15], 6: [2, 15], 25: [2, 15], 26: [2, 15], 49: [2, 15], 54: [2, 15], 57: [2, 15], 72: [2, 15], 77: [2, 15], 85: [2, 15], 90: [2, 15], 92: [2, 15], 101: [2, 15], 103: [2, 15], 104: [2, 15], 105: [2, 15], 109: [2, 15], 117: [2, 15], 125: [2, 15], 127: [2, 15], 128: [2, 15], 131: [2, 15], 132: [2, 15], 133: [2, 15], 134: [2, 15], 135: [2, 15], 136: [2, 15]},
                    {1: [2, 16], 6: [2, 16], 25: [2, 16], 26: [2, 16], 49: [2, 16], 54: [2, 16], 57: [2, 16], 72: [2, 16], 77: [2, 16], 85: [2, 16], 90: [2, 16], 92: [2, 16], 101: [2, 16], 103: [2, 16], 104: [2, 16], 105: [2, 16], 109: [2, 16], 117: [2, 16], 125: [2, 16], 127: [2, 16], 128: [2, 16], 131: [2, 16], 132: [2, 16], 133: [2, 16], 134: [2, 16], 135: [2, 16], 136: [2, 16]},
                    {1: [2, 17], 6: [2, 17], 25: [2, 17], 26: [2, 17], 49: [2, 17], 54: [2, 17], 57: [2, 17], 72: [2, 17], 77: [2, 17], 85: [2, 17], 90: [2, 17], 92: [2, 17], 101: [2, 17], 103: [2, 17], 104: [2, 17], 105: [2, 17], 109: [2, 17], 117: [2, 17], 125: [2, 17], 127: [2, 17], 128: [2, 17], 131: [2, 17], 132: [2, 17], 133: [2, 17], 134: [2, 17], 135: [2, 17], 136: [2, 17]},
                    {1: [2, 18], 6: [2, 18], 25: [2, 18], 26: [2, 18], 49: [2, 18], 54: [2, 18], 57: [2, 18], 72: [2, 18], 77: [2, 18], 85: [2, 18], 90: [2, 18], 92: [2, 18], 101: [2, 18], 103: [2, 18], 104: [2, 18], 105: [2, 18], 109: [2, 18], 117: [2, 18], 125: [2, 18], 127: [2, 18], 128: [2, 18], 131: [2, 18], 132: [2, 18], 133: [2, 18], 134: [2, 18], 135: [2, 18], 136: [2, 18]},
                    {1: [2, 19], 6: [2, 19], 25: [2, 19], 26: [2, 19], 49: [2, 19], 54: [2, 19], 57: [2, 19], 72: [2, 19], 77: [2, 19], 85: [2, 19], 90: [2, 19], 92: [2, 19], 101: [2, 19], 103: [2, 19], 104: [2, 19], 105: [2, 19], 109: [2, 19], 117: [2, 19], 125: [2, 19], 127: [2, 19], 128: [2, 19], 131: [2, 19], 132: [2, 19], 133: [2, 19], 134: [2, 19], 135: [2, 19], 136: [2, 19]},
                    {1: [2, 20], 6: [2, 20], 25: [2, 20], 26: [2, 20], 49: [2, 20], 54: [2, 20], 57: [2, 20], 72: [2, 20], 77: [2, 20], 85: [2, 20], 90: [2, 20], 92: [2, 20], 101: [2, 20], 103: [2, 20], 104: [2, 20], 105: [2, 20], 109: [2, 20], 117: [2, 20], 125: [2, 20], 127: [2, 20], 128: [2, 20], 131: [2, 20], 132: [2, 20], 133: [2, 20], 134: [2, 20], 135: [2, 20], 136: [2, 20]},
                    {1: [2, 21], 6: [2, 21], 25: [2, 21], 26: [2, 21], 49: [2, 21], 54: [2, 21], 57: [2, 21], 72: [2, 21], 77: [2, 21], 85: [2, 21], 90: [2, 21], 92: [2, 21], 101: [2, 21], 103: [2, 21], 104: [2, 21], 105: [2, 21], 109: [2, 21], 117: [2, 21], 125: [2, 21], 127: [2, 21], 128: [2, 21], 131: [2, 21], 132: [2, 21], 133: [2, 21], 134: [2, 21], 135: [2, 21], 136: [2, 21]},
                    {1: [2, 22], 6: [2, 22], 25: [2, 22], 26: [2, 22], 49: [2, 22], 54: [2, 22], 57: [2, 22], 72: [2, 22], 77: [2, 22], 85: [2, 22], 90: [2, 22], 92: [2, 22], 101: [2, 22], 103: [2, 22], 104: [2, 22], 105: [2, 22], 109: [2, 22], 117: [2, 22], 125: [2, 22], 127: [2, 22], 128: [2, 22], 131: [2, 22], 132: [2, 22], 133: [2, 22], 134: [2, 22], 135: [2, 22], 136: [2, 22]},
                    {1: [2, 23], 6: [2, 23], 25: [2, 23], 26: [2, 23], 49: [2, 23], 54: [2, 23], 57: [2, 23], 72: [2, 23], 77: [2, 23], 85: [2, 23], 90: [2, 23], 92: [2, 23], 101: [2, 23], 103: [2, 23], 104: [2, 23], 105: [2, 23], 109: [2, 23], 117: [2, 23], 125: [2, 23], 127: [2, 23], 128: [2, 23], 131: [2, 23], 132: [2, 23], 133: [2, 23], 134: [2, 23], 135: [2, 23], 136: [2, 23]},
                    {1: [2, 9], 6: [2, 9], 26: [2, 9], 101: [2, 9], 103: [2, 9], 105: [2, 9], 109: [2, 9], 125: [2, 9]},
                    {1: [2, 10], 6: [2, 10], 26: [2, 10], 101: [2, 10], 103: [2, 10], 105: [2, 10], 109: [2, 10], 125: [2, 10]},
                    {1: [2, 11], 6: [2, 11], 26: [2, 11], 101: [2, 11], 103: [2, 11], 105: [2, 11], 109: [2, 11], 125: [2, 11]},
                    {1: [2, 75], 6: [2, 75], 25: [2, 75], 26: [2, 75], 40: [1, 103], 49: [2, 75], 54: [2, 75], 57: [2, 75], 66: [2, 75], 67: [2, 75], 68: [2, 75], 70: [2, 75], 72: [2, 75], 73: [2, 75], 77: [2, 75], 83: [2, 75], 84: [2, 75], 85: [2, 75], 90: [2, 75], 92: [2, 75], 101: [2, 75], 103: [2, 75], 104: [2, 75], 105: [2, 75], 109: [2, 75], 117: [2, 75], 125: [2, 75], 127: [2, 75], 128: [2, 75], 131: [2, 75], 132: [2, 75], 133: [2, 75], 134: [2, 75], 135: [2, 75], 136: [2, 75]},
                    {1: [2, 76], 6: [2, 76], 25: [2, 76], 26: [2, 76], 49: [2, 76], 54: [2, 76], 57: [2, 76], 66: [2, 76], 67: [2, 76], 68: [2, 76], 70: [2, 76], 72: [2, 76], 73: [2, 76], 77: [2, 76], 83: [2, 76], 84: [2, 76], 85: [2, 76], 90: [2, 76], 92: [2, 76], 101: [2, 76], 103: [2, 76], 104: [2, 76], 105: [2, 76], 109: [2, 76], 117: [2, 76], 125: [2, 76], 127: [2, 76], 128: [2, 76], 131: [2, 76], 132: [2, 76], 133: [2, 76], 134: [2, 76], 135: [2, 76], 136: [2, 76]},
                    {1: [2, 77], 6: [2, 77], 25: [2, 77], 26: [2, 77], 49: [2, 77], 54: [2, 77], 57: [2, 77], 66: [2, 77], 67: [2, 77], 68: [2, 77], 70: [2, 77], 72: [2, 77], 73: [2, 77], 77: [2, 77], 83: [2, 77], 84: [2, 77], 85: [2, 77], 90: [2, 77], 92: [2, 77], 101: [2, 77], 103: [2, 77], 104: [2, 77], 105: [2, 77], 109: [2, 77], 117: [2, 77], 125: [2, 77], 127: [2, 77], 128: [2, 77], 131: [2, 77], 132: [2, 77], 133: [2, 77], 134: [2, 77], 135: [2, 77], 136: [2, 77]},
                    {1: [2, 78], 6: [2, 78], 25: [2, 78], 26: [2, 78], 49: [2, 78], 54: [2, 78], 57: [2, 78], 66: [2, 78], 67: [2, 78], 68: [2, 78], 70: [2, 78], 72: [2, 78], 73: [2, 78], 77: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78], 90: [2, 78], 92: [2, 78], 101: [2, 78], 103: [2, 78], 104: [2, 78], 105: [2, 78], 109: [2, 78], 117: [2, 78], 125: [2, 78], 127: [2, 78], 128: [2, 78], 131: [2, 78], 132: [2, 78], 133: [2, 78], 134: [2, 78], 135: [2, 78], 136: [2, 78]},
                    {1: [2, 79], 6: [2, 79], 25: [2, 79], 26: [2, 79], 49: [2, 79], 54: [2, 79], 57: [2, 79], 66: [2, 79], 67: [2, 79], 68: [2, 79], 70: [2, 79], 72: [2, 79], 73: [2, 79], 77: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79], 90: [2, 79], 92: [2, 79], 101: [2, 79], 103: [2, 79], 104: [2, 79], 105: [2, 79], 109: [2, 79], 117: [2, 79], 125: [2, 79], 127: [2, 79], 128: [2, 79], 131: [2, 79], 132: [2, 79], 133: [2, 79], 134: [2, 79], 135: [2, 79], 136: [2, 79]},
                    {1: [2, 105], 6: [2, 105], 25: [2, 105], 26: [2, 105], 49: [2, 105], 54: [2, 105], 57: [2, 105], 66: [2, 105], 67: [2, 105], 68: [2, 105], 70: [2, 105], 72: [2, 105], 73: [2, 105], 77: [2, 105], 81: 104, 83: [2, 105], 84: [1, 105], 85: [2, 105], 90: [2, 105], 92: [2, 105], 101: [2, 105], 103: [2, 105], 104: [2, 105], 105: [2, 105], 109: [2, 105], 117: [2, 105], 125: [2, 105], 127: [2, 105], 128: [2, 105], 131: [2, 105], 132: [2, 105], 133: [2, 105], 134: [2, 105], 135: [2, 105], 136: [2, 105]},
                    {6: [2, 55], 25: [2, 55], 27: 109, 28: [1, 73], 44: 110, 48: 106, 49: [2, 55], 54: [2, 55], 55: 107, 56: 108, 58: 111, 59: 112, 75: [1, 70], 88: [1, 113], 89: [1, 114]},
                    {5: 115, 25: [1, 5]},
                    {8: 116, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 118, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 119, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {13: 121, 14: 122, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 123, 44: 63, 58: 47, 59: 48, 61: 120, 63: 25, 64: 26, 65: 27, 75: [1, 70], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 100: [1, 56]},
                    {13: 121, 14: 122, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 123, 44: 63, 58: 47, 59: 48, 61: 124, 63: 25, 64: 26, 65: 27, 75: [1, 70], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 100: [1, 56]},
                    {1: [2, 72], 6: [2, 72], 25: [2, 72], 26: [2, 72], 40: [2, 72], 49: [2, 72], 54: [2, 72], 57: [2, 72], 66: [2, 72], 67: [2, 72], 68: [2, 72], 70: [2, 72], 72: [2, 72], 73: [2, 72], 77: [2, 72], 79: [1, 128], 83: [2, 72], 84: [2, 72], 85: [2, 72], 90: [2, 72], 92: [2, 72], 101: [2, 72], 103: [2, 72], 104: [2, 72], 105: [2, 72], 109: [2, 72], 117: [2, 72], 125: [2, 72], 127: [2, 72], 128: [2, 72], 129: [1, 125], 130: [1, 126], 131: [2, 72], 132: [2, 72], 133: [2, 72], 134: [2, 72], 135: [2, 72], 136: [2, 72], 137: [1, 127]},
                    {1: [2, 180], 6: [2, 180], 25: [2, 180], 26: [2, 180], 49: [2, 180], 54: [2, 180], 57: [2, 180], 72: [2, 180], 77: [2, 180], 85: [2, 180], 90: [2, 180], 92: [2, 180], 101: [2, 180], 103: [2, 180], 104: [2, 180], 105: [2, 180], 109: [2, 180], 117: [2, 180], 120: [1, 129], 125: [2, 180], 127: [2, 180], 128: [2, 180], 131: [2, 180], 132: [2, 180], 133: [2, 180], 134: [2, 180], 135: [2, 180], 136: [2, 180]},
                    {5: 130, 25: [1, 5]},
                    {5: 131, 25: [1, 5]},
                    {1: [2, 147], 6: [2, 147], 25: [2, 147], 26: [2, 147], 49: [2, 147], 54: [2, 147], 57: [2, 147], 72: [2, 147], 77: [2, 147], 85: [2, 147], 90: [2, 147], 92: [2, 147], 101: [2, 147], 103: [2, 147], 104: [2, 147], 105: [2, 147], 109: [2, 147], 117: [2, 147], 125: [2, 147], 127: [2, 147], 128: [2, 147], 131: [2, 147], 132: [2, 147], 133: [2, 147], 134: [2, 147], 135: [2, 147], 136: [2, 147]},
                    {5: 132, 25: [1, 5]},
                    {8: 133, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 134], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 95], 5: 135, 6: [2, 95], 13: 121, 14: 122, 25: [1, 5], 26: [2, 95], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 123, 44: 63, 49: [2, 95], 54: [2, 95], 57: [2, 95], 58: 47, 59: 48, 61: 137, 63: 25, 64: 26, 65: 27, 72: [2, 95], 75: [1, 70], 77: [2, 95], 79: [1, 136], 82: [1, 28], 85: [2, 95], 87: [1, 58], 88: [1, 59], 89: [1, 57], 90: [2, 95], 92: [2, 95], 100: [1, 56], 101: [2, 95], 103: [2, 95], 104: [2, 95], 105: [2, 95], 109: [2, 95], 117: [2, 95], 125: [2, 95], 127: [2, 95], 128: [2, 95], 131: [2, 95], 132: [2, 95], 133: [2, 95], 134: [2, 95], 135: [2, 95], 136: [2, 95]},
                    {8: 138, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 47], 6: [2, 47], 8: 139, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 26: [2, 47], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 101: [2, 47], 102: 39, 103: [2, 47], 105: [2, 47], 106: 40, 107: [1, 67], 108: 41, 109: [2, 47], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 125: [2, 47], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 48], 6: [2, 48], 25: [2, 48], 26: [2, 48], 54: [2, 48], 77: [2, 48], 101: [2, 48], 103: [2, 48], 105: [2, 48], 109: [2, 48], 125: [2, 48]},
                    {1: [2, 73], 6: [2, 73], 25: [2, 73], 26: [2, 73], 40: [2, 73], 49: [2, 73], 54: [2, 73], 57: [2, 73], 66: [2, 73], 67: [2, 73], 68: [2, 73], 70: [2, 73], 72: [2, 73], 73: [2, 73], 77: [2, 73], 83: [2, 73], 84: [2, 73], 85: [2, 73], 90: [2, 73], 92: [2, 73], 101: [2, 73], 103: [2, 73], 104: [2, 73], 105: [2, 73], 109: [2, 73], 117: [2, 73], 125: [2, 73], 127: [2, 73], 128: [2, 73], 131: [2, 73], 132: [2, 73], 133: [2, 73], 134: [2, 73], 135: [2, 73], 136: [2, 73]},
                    {1: [2, 74], 6: [2, 74], 25: [2, 74], 26: [2, 74], 40: [2, 74], 49: [2, 74], 54: [2, 74], 57: [2, 74], 66: [2, 74], 67: [2, 74], 68: [2, 74], 70: [2, 74], 72: [2, 74], 73: [2, 74], 77: [2, 74], 83: [2, 74], 84: [2, 74], 85: [2, 74], 90: [2, 74], 92: [2, 74], 101: [2, 74], 103: [2, 74], 104: [2, 74], 105: [2, 74], 109: [2, 74], 117: [2, 74], 125: [2, 74], 127: [2, 74], 128: [2, 74], 131: [2, 74], 132: [2, 74], 133: [2, 74], 134: [2, 74], 135: [2, 74], 136: [2, 74]},
                    {1: [2, 29], 6: [2, 29], 25: [2, 29], 26: [2, 29], 49: [2, 29], 54: [2, 29], 57: [2, 29], 66: [2, 29], 67: [2, 29], 68: [2, 29], 70: [2, 29], 72: [2, 29], 73: [2, 29], 77: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29], 90: [2, 29], 92: [2, 29], 101: [2, 29], 103: [2, 29], 104: [2, 29], 105: [2, 29], 109: [2, 29], 117: [2, 29], 125: [2, 29], 127: [2, 29], 128: [2, 29], 131: [2, 29], 132: [2, 29], 133: [2, 29], 134: [2, 29], 135: [2, 29], 136: [2, 29]},
                    {1: [2, 30], 6: [2, 30], 25: [2, 30], 26: [2, 30], 49: [2, 30], 54: [2, 30], 57: [2, 30], 66: [2, 30], 67: [2, 30], 68: [2, 30], 70: [2, 30], 72: [2, 30], 73: [2, 30], 77: [2, 30], 83: [2, 30], 84: [2, 30], 85: [2, 30], 90: [2, 30], 92: [2, 30], 101: [2, 30], 103: [2, 30], 104: [2, 30], 105: [2, 30], 109: [2, 30], 117: [2, 30], 125: [2, 30], 127: [2, 30], 128: [2, 30], 131: [2, 30], 132: [2, 30], 133: [2, 30], 134: [2, 30], 135: [2, 30], 136: [2, 30]},
                    {1: [2, 31], 6: [2, 31], 25: [2, 31], 26: [2, 31], 49: [2, 31], 54: [2, 31], 57: [2, 31], 66: [2, 31], 67: [2, 31], 68: [2, 31], 70: [2, 31], 72: [2, 31], 73: [2, 31], 77: [2, 31], 83: [2, 31], 84: [2, 31], 85: [2, 31], 90: [2, 31], 92: [2, 31], 101: [2, 31], 103: [2, 31], 104: [2, 31], 105: [2, 31], 109: [2, 31], 117: [2, 31], 125: [2, 31], 127: [2, 31], 128: [2, 31], 131: [2, 31], 132: [2, 31], 133: [2, 31], 134: [2, 31], 135: [2, 31], 136: [2, 31]},
                    {1: [2, 32], 6: [2, 32], 25: [2, 32], 26: [2, 32], 49: [2, 32], 54: [2, 32], 57: [2, 32], 66: [2, 32], 67: [2, 32], 68: [2, 32], 70: [2, 32], 72: [2, 32], 73: [2, 32], 77: [2, 32], 83: [2, 32], 84: [2, 32], 85: [2, 32], 90: [2, 32], 92: [2, 32], 101: [2, 32], 103: [2, 32], 104: [2, 32], 105: [2, 32], 109: [2, 32], 117: [2, 32], 125: [2, 32], 127: [2, 32], 128: [2, 32], 131: [2, 32], 132: [2, 32], 133: [2, 32], 134: [2, 32], 135: [2, 32], 136: [2, 32]},
                    {1: [2, 33], 6: [2, 33], 25: [2, 33], 26: [2, 33], 49: [2, 33], 54: [2, 33], 57: [2, 33], 66: [2, 33], 67: [2, 33], 68: [2, 33], 70: [2, 33], 72: [2, 33], 73: [2, 33], 77: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33], 90: [2, 33], 92: [2, 33], 101: [2, 33], 103: [2, 33], 104: [2, 33], 105: [2, 33], 109: [2, 33], 117: [2, 33], 125: [2, 33], 127: [2, 33], 128: [2, 33], 131: [2, 33], 132: [2, 33], 133: [2, 33], 134: [2, 33], 135: [2, 33], 136: [2, 33]},
                    {1: [2, 34], 6: [2, 34], 25: [2, 34], 26: [2, 34], 49: [2, 34], 54: [2, 34], 57: [2, 34], 66: [2, 34], 67: [2, 34], 68: [2, 34], 70: [2, 34], 72: [2, 34], 73: [2, 34], 77: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34], 90: [2, 34], 92: [2, 34], 101: [2, 34], 103: [2, 34], 104: [2, 34], 105: [2, 34], 109: [2, 34], 117: [2, 34], 125: [2, 34], 127: [2, 34], 128: [2, 34], 131: [2, 34], 132: [2, 34], 133: [2, 34], 134: [2, 34], 135: [2, 34], 136: [2, 34]},
                    {1: [2, 35], 6: [2, 35], 25: [2, 35], 26: [2, 35], 49: [2, 35], 54: [2, 35], 57: [2, 35], 66: [2, 35], 67: [2, 35], 68: [2, 35], 70: [2, 35], 72: [2, 35], 73: [2, 35], 77: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35], 90: [2, 35], 92: [2, 35], 101: [2, 35], 103: [2, 35], 104: [2, 35], 105: [2, 35], 109: [2, 35], 117: [2, 35], 125: [2, 35], 127: [2, 35], 128: [2, 35], 131: [2, 35], 132: [2, 35], 133: [2, 35], 134: [2, 35], 135: [2, 35], 136: [2, 35]},
                    {4: 140, 7: 4, 8: 6, 9: 7, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 141], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 142, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 146], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 86: 144, 87: [1, 58], 88: [1, 59], 89: [1, 57], 90: [1, 143], 93: 145, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 111], 6: [2, 111], 25: [2, 111], 26: [2, 111], 49: [2, 111], 54: [2, 111], 57: [2, 111], 66: [2, 111], 67: [2, 111], 68: [2, 111], 70: [2, 111], 72: [2, 111], 73: [2, 111], 77: [2, 111], 83: [2, 111], 84: [2, 111], 85: [2, 111], 90: [2, 111], 92: [2, 111], 101: [2, 111], 103: [2, 111], 104: [2, 111], 105: [2, 111], 109: [2, 111], 117: [2, 111], 125: [2, 111], 127: [2, 111], 128: [2, 111], 131: [2, 111], 132: [2, 111], 133: [2, 111], 134: [2, 111], 135: [2, 111], 136: [2, 111]},
                    {1: [2, 112], 6: [2, 112], 25: [2, 112], 26: [2, 112], 27: 148, 28: [1, 73], 49: [2, 112], 54: [2, 112], 57: [2, 112], 66: [2, 112], 67: [2, 112], 68: [2, 112], 70: [2, 112], 72: [2, 112], 73: [2, 112], 77: [2, 112], 83: [2, 112], 84: [2, 112], 85: [2, 112], 90: [2, 112], 92: [2, 112], 101: [2, 112], 103: [2, 112], 104: [2, 112], 105: [2, 112], 109: [2, 112], 117: [2, 112], 125: [2, 112], 127: [2, 112], 128: [2, 112], 131: [2, 112], 132: [2, 112], 133: [2, 112], 134: [2, 112], 135: [2, 112], 136: [2, 112]},
                    {25: [2, 51]},
                    {25: [2, 52]},
                    {1: [2, 68], 6: [2, 68], 25: [2, 68], 26: [2, 68], 40: [2, 68], 49: [2, 68], 54: [2, 68], 57: [2, 68], 66: [2, 68], 67: [2, 68], 68: [2, 68], 70: [2, 68], 72: [2, 68], 73: [2, 68], 77: [2, 68], 79: [2, 68], 83: [2, 68], 84: [2, 68], 85: [2, 68], 90: [2, 68], 92: [2, 68], 101: [2, 68], 103: [2, 68], 104: [2, 68], 105: [2, 68], 109: [2, 68], 117: [2, 68], 125: [2, 68], 127: [2, 68], 128: [2, 68], 129: [2, 68], 130: [2, 68], 131: [2, 68], 132: [2, 68], 133: [2, 68], 134: [2, 68], 135: [2, 68], 136: [2, 68], 137: [2, 68]},
                    {1: [2, 71], 6: [2, 71], 25: [2, 71], 26: [2, 71], 40: [2, 71], 49: [2, 71], 54: [2, 71], 57: [2, 71], 66: [2, 71], 67: [2, 71], 68: [2, 71], 70: [2, 71], 72: [2, 71], 73: [2, 71], 77: [2, 71], 79: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71], 90: [2, 71], 92: [2, 71], 101: [2, 71], 103: [2, 71], 104: [2, 71], 105: [2, 71], 109: [2, 71], 117: [2, 71], 125: [2, 71], 127: [2, 71], 128: [2, 71], 129: [2, 71], 130: [2, 71], 131: [2, 71], 132: [2, 71], 133: [2, 71], 134: [2, 71], 135: [2, 71], 136: [2, 71], 137: [2, 71]},
                    {8: 149, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 150, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 151, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {5: 152, 8: 153, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 5], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {27: 158, 28: [1, 73], 44: 159, 58: 160, 59: 161, 64: 154, 75: [1, 70], 88: [1, 113], 89: [1, 57], 112: 155, 113: [1, 156], 114: 157},
                    {111: 162, 115: [1, 163], 116: [1, 164]},
                    {6: [2, 90], 11: 168, 25: [2, 90], 27: 169, 28: [1, 73], 29: 170, 30: [1, 71], 31: [1, 72], 41: 166, 42: 167, 44: 171, 46: [1, 46], 54: [2, 90], 76: 165, 77: [2, 90], 88: [1, 113]},
                    {1: [2, 27], 6: [2, 27], 25: [2, 27], 26: [2, 27], 43: [2, 27], 49: [2, 27], 54: [2, 27], 57: [2, 27], 66: [2, 27], 67: [2, 27], 68: [2, 27], 70: [2, 27], 72: [2, 27], 73: [2, 27], 77: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27], 90: [2, 27], 92: [2, 27], 101: [2, 27], 103: [2, 27], 104: [2, 27], 105: [2, 27], 109: [2, 27], 117: [2, 27], 125: [2, 27], 127: [2, 27], 128: [2, 27], 131: [2, 27], 132: [2, 27], 133: [2, 27], 134: [2, 27], 135: [2, 27], 136: [2, 27]},
                    {1: [2, 28], 6: [2, 28], 25: [2, 28], 26: [2, 28], 43: [2, 28], 49: [2, 28], 54: [2, 28], 57: [2, 28], 66: [2, 28], 67: [2, 28], 68: [2, 28], 70: [2, 28], 72: [2, 28], 73: [2, 28], 77: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28], 90: [2, 28], 92: [2, 28], 101: [2, 28], 103: [2, 28], 104: [2, 28], 105: [2, 28], 109: [2, 28], 117: [2, 28], 125: [2, 28], 127: [2, 28], 128: [2, 28], 131: [2, 28], 132: [2, 28], 133: [2, 28], 134: [2, 28], 135: [2, 28], 136: [2, 28]},
                    {1: [2, 26], 6: [2, 26], 25: [2, 26], 26: [2, 26], 40: [2, 26], 43: [2, 26], 49: [2, 26], 54: [2, 26], 57: [2, 26], 66: [2, 26], 67: [2, 26], 68: [2, 26], 70: [2, 26], 72: [2, 26], 73: [2, 26], 77: [2, 26], 79: [2, 26], 83: [2, 26], 84: [2, 26], 85: [2, 26], 90: [2, 26], 92: [2, 26], 101: [2, 26], 103: [2, 26], 104: [2, 26], 105: [2, 26], 109: [2, 26], 115: [2, 26], 116: [2, 26], 117: [2, 26], 125: [2, 26], 127: [2, 26], 128: [2, 26], 129: [2, 26], 130: [2, 26], 131: [2, 26], 132: [2, 26], 133: [2, 26], 134: [2, 26], 135: [2, 26], 136: [2, 26], 137: [2, 26]},
                    {1: [2, 6], 6: [2, 6], 7: 172, 8: 6, 9: 7, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 26: [2, 6], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 101: [2, 6], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 3]},
                    {1: [2, 24], 6: [2, 24], 25: [2, 24], 26: [2, 24], 49: [2, 24], 54: [2, 24], 57: [2, 24], 72: [2, 24], 77: [2, 24], 85: [2, 24], 90: [2, 24], 92: [2, 24], 97: [2, 24], 98: [2, 24], 101: [2, 24], 103: [2, 24], 104: [2, 24], 105: [2, 24], 109: [2, 24], 117: [2, 24], 120: [2, 24], 122: [2, 24], 125: [2, 24], 127: [2, 24], 128: [2, 24], 131: [2, 24], 132: [2, 24], 133: [2, 24], 134: [2, 24], 135: [2, 24], 136: [2, 24]},
                    {6: [1, 74], 26: [1, 173]},
                    {1: [2, 191], 6: [2, 191], 25: [2, 191], 26: [2, 191], 49: [2, 191], 54: [2, 191], 57: [2, 191], 72: [2, 191], 77: [2, 191], 85: [2, 191], 90: [2, 191], 92: [2, 191], 101: [2, 191], 103: [2, 191], 104: [2, 191], 105: [2, 191], 109: [2, 191], 117: [2, 191], 125: [2, 191], 127: [2, 191], 128: [2, 191], 131: [2, 191], 132: [2, 191], 133: [2, 191], 134: [2, 191], 135: [2, 191], 136: [2, 191]},
                    {8: 174, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 175, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 176, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 177, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 178, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 179, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 180, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 181, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 146], 6: [2, 146], 25: [2, 146], 26: [2, 146], 49: [2, 146], 54: [2, 146], 57: [2, 146], 72: [2, 146], 77: [2, 146], 85: [2, 146], 90: [2, 146], 92: [2, 146], 101: [2, 146], 103: [2, 146], 104: [2, 146], 105: [2, 146], 109: [2, 146], 117: [2, 146], 125: [2, 146], 127: [2, 146], 128: [2, 146], 131: [2, 146], 132: [2, 146], 133: [2, 146], 134: [2, 146], 135: [2, 146], 136: [2, 146]},
                    {1: [2, 151], 6: [2, 151], 25: [2, 151], 26: [2, 151], 49: [2, 151], 54: [2, 151], 57: [2, 151], 72: [2, 151], 77: [2, 151], 85: [2, 151], 90: [2, 151], 92: [2, 151], 101: [2, 151], 103: [2, 151], 104: [2, 151], 105: [2, 151], 109: [2, 151], 117: [2, 151], 125: [2, 151], 127: [2, 151], 128: [2, 151], 131: [2, 151], 132: [2, 151], 133: [2, 151], 134: [2, 151], 135: [2, 151], 136: [2, 151]},
                    {8: 182, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 145], 6: [2, 145], 25: [2, 145], 26: [2, 145], 49: [2, 145], 54: [2, 145], 57: [2, 145], 72: [2, 145], 77: [2, 145], 85: [2, 145], 90: [2, 145], 92: [2, 145], 101: [2, 145], 103: [2, 145], 104: [2, 145], 105: [2, 145], 109: [2, 145], 117: [2, 145], 125: [2, 145], 127: [2, 145], 128: [2, 145], 131: [2, 145], 132: [2, 145], 133: [2, 145], 134: [2, 145], 135: [2, 145], 136: [2, 145]},
                    {1: [2, 150], 6: [2, 150], 25: [2, 150], 26: [2, 150], 49: [2, 150], 54: [2, 150], 57: [2, 150], 72: [2, 150], 77: [2, 150], 85: [2, 150], 90: [2, 150], 92: [2, 150], 101: [2, 150], 103: [2, 150], 104: [2, 150], 105: [2, 150], 109: [2, 150], 117: [2, 150], 125: [2, 150], 127: [2, 150], 128: [2, 150], 131: [2, 150], 132: [2, 150], 133: [2, 150], 134: [2, 150], 135: [2, 150], 136: [2, 150]},
                    {81: 183, 84: [1, 105]},
                    {1: [2, 69], 6: [2, 69], 25: [2, 69], 26: [2, 69], 40: [2, 69], 49: [2, 69], 54: [2, 69], 57: [2, 69], 66: [2, 69], 67: [2, 69], 68: [2, 69], 70: [2, 69], 72: [2, 69], 73: [2, 69], 77: [2, 69], 79: [2, 69], 83: [2, 69], 84: [2, 69], 85: [2, 69], 90: [2, 69], 92: [2, 69], 101: [2, 69], 103: [2, 69], 104: [2, 69], 105: [2, 69], 109: [2, 69], 117: [2, 69], 125: [2, 69], 127: [2, 69], 128: [2, 69], 129: [2, 69], 130: [2, 69], 131: [2, 69], 132: [2, 69], 133: [2, 69], 134: [2, 69], 135: [2, 69], 136: [2, 69], 137: [2, 69]},
                    {84: [2, 108]},
                    {27: 184, 28: [1, 73]},
                    {27: 185, 28: [1, 73]},
                    {1: [2, 83], 6: [2, 83], 25: [2, 83], 26: [2, 83], 27: 186, 28: [1, 73], 40: [2, 83], 49: [2, 83], 54: [2, 83], 57: [2, 83], 66: [2, 83], 67: [2, 83], 68: [2, 83], 70: [2, 83], 72: [2, 83], 73: [2, 83], 77: [2, 83], 79: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83], 90: [2, 83], 92: [2, 83], 101: [2, 83], 103: [2, 83], 104: [2, 83], 105: [2, 83], 109: [2, 83], 117: [2, 83], 125: [2, 83], 127: [2, 83], 128: [2, 83], 129: [2, 83], 130: [2, 83], 131: [2, 83], 132: [2, 83], 133: [2, 83], 134: [2, 83], 135: [2, 83], 136: [2, 83], 137: [2, 83]},
                    {1: [2, 84], 6: [2, 84], 25: [2, 84], 26: [2, 84], 40: [2, 84], 49: [2, 84], 54: [2, 84], 57: [2, 84], 66: [2, 84], 67: [2, 84], 68: [2, 84], 70: [2, 84], 72: [2, 84], 73: [2, 84], 77: [2, 84], 79: [2, 84], 83: [2, 84], 84: [2, 84], 85: [2, 84], 90: [2, 84], 92: [2, 84], 101: [2, 84], 103: [2, 84], 104: [2, 84], 105: [2, 84], 109: [2, 84], 117: [2, 84], 125: [2, 84], 127: [2, 84], 128: [2, 84], 129: [2, 84], 130: [2, 84], 131: [2, 84], 132: [2, 84], 133: [2, 84], 134: [2, 84], 135: [2, 84], 136: [2, 84], 137: [2, 84]},
                    {8: 188, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 57: [1, 192], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 71: 187, 74: 189, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 91: 190, 92: [1, 191], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {69: 193, 70: [1, 99], 73: [1, 100]},
                    {81: 194, 84: [1, 105]},
                    {1: [2, 70], 6: [2, 70], 25: [2, 70], 26: [2, 70], 40: [2, 70], 49: [2, 70], 54: [2, 70], 57: [2, 70], 66: [2, 70], 67: [2, 70], 68: [2, 70], 70: [2, 70], 72: [2, 70], 73: [2, 70], 77: [2, 70], 79: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70], 90: [2, 70], 92: [2, 70], 101: [2, 70], 103: [2, 70], 104: [2, 70], 105: [2, 70], 109: [2, 70], 117: [2, 70], 125: [2, 70], 127: [2, 70], 128: [2, 70], 129: [2, 70], 130: [2, 70], 131: [2, 70], 132: [2, 70], 133: [2, 70], 134: [2, 70], 135: [2, 70], 136: [2, 70], 137: [2, 70]},
                    {6: [1, 196], 8: 195, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 197], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 106], 6: [2, 106], 25: [2, 106], 26: [2, 106], 49: [2, 106], 54: [2, 106], 57: [2, 106], 66: [2, 106], 67: [2, 106], 68: [2, 106], 70: [2, 106], 72: [2, 106], 73: [2, 106], 77: [2, 106], 83: [2, 106], 84: [2, 106], 85: [2, 106], 90: [2, 106], 92: [2, 106], 101: [2, 106], 103: [2, 106], 104: [2, 106], 105: [2, 106], 109: [2, 106], 117: [2, 106], 125: [2, 106], 127: [2, 106], 128: [2, 106], 131: [2, 106], 132: [2, 106], 133: [2, 106], 134: [2, 106], 135: [2, 106], 136: [2, 106]},
                    {8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 146], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 85: [1, 198], 86: 199, 87: [1, 58], 88: [1, 59], 89: [1, 57], 93: 145, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 53], 25: [2, 53], 49: [1, 201], 53: 203, 54: [1, 202]},
                    {6: [2, 56], 25: [2, 56], 26: [2, 56], 49: [2, 56], 54: [2, 56]},
                    {6: [2, 60], 25: [2, 60], 26: [2, 60], 40: [1, 205], 49: [2, 60], 54: [2, 60], 57: [1, 204]},
                    {6: [2, 63], 25: [2, 63], 26: [2, 63], 40: [2, 63], 49: [2, 63], 54: [2, 63], 57: [2, 63]},
                    {6: [2, 64], 25: [2, 64], 26: [2, 64], 40: [2, 64], 49: [2, 64], 54: [2, 64], 57: [2, 64]},
                    {6: [2, 65], 25: [2, 65], 26: [2, 65], 40: [2, 65], 49: [2, 65], 54: [2, 65], 57: [2, 65]},
                    {6: [2, 66], 25: [2, 66], 26: [2, 66], 40: [2, 66], 49: [2, 66], 54: [2, 66], 57: [2, 66]},
                    {27: 148, 28: [1, 73]},
                    {8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 146], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 86: 144, 87: [1, 58], 88: [1, 59], 89: [1, 57], 90: [1, 143], 93: 145, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 50], 6: [2, 50], 25: [2, 50], 26: [2, 50], 49: [2, 50], 54: [2, 50], 57: [2, 50], 72: [2, 50], 77: [2, 50], 85: [2, 50], 90: [2, 50], 92: [2, 50], 101: [2, 50], 103: [2, 50], 104: [2, 50], 105: [2, 50], 109: [2, 50], 117: [2, 50], 125: [2, 50], 127: [2, 50], 128: [2, 50], 131: [2, 50], 132: [2, 50], 133: [2, 50], 134: [2, 50], 135: [2, 50], 136: [2, 50]},
                    {1: [2, 184], 6: [2, 184], 25: [2, 184], 26: [2, 184], 49: [2, 184], 54: [2, 184], 57: [2, 184], 72: [2, 184], 77: [2, 184], 85: [2, 184], 90: [2, 184], 92: [2, 184], 101: [2, 184], 102: 87, 103: [2, 184], 104: [2, 184], 105: [2, 184], 108: 88, 109: [2, 184], 110: 69, 117: [2, 184], 125: [2, 184], 127: [2, 184], 128: [2, 184], 131: [1, 78], 132: [2, 184], 133: [2, 184], 134: [2, 184], 135: [2, 184], 136: [2, 184]},
                    {102: 90, 103: [1, 65], 105: [1, 66], 108: 91, 109: [1, 68], 110: 69, 125: [1, 89]},
                    {1: [2, 185], 6: [2, 185], 25: [2, 185], 26: [2, 185], 49: [2, 185], 54: [2, 185], 57: [2, 185], 72: [2, 185], 77: [2, 185], 85: [2, 185], 90: [2, 185], 92: [2, 185], 101: [2, 185], 102: 87, 103: [2, 185], 104: [2, 185], 105: [2, 185], 108: 88, 109: [2, 185], 110: 69, 117: [2, 185], 125: [2, 185], 127: [2, 185], 128: [2, 185], 131: [1, 78], 132: [2, 185], 133: [2, 185], 134: [2, 185], 135: [2, 185], 136: [2, 185]},
                    {1: [2, 186], 6: [2, 186], 25: [2, 186], 26: [2, 186], 49: [2, 186], 54: [2, 186], 57: [2, 186], 72: [2, 186], 77: [2, 186], 85: [2, 186], 90: [2, 186], 92: [2, 186], 101: [2, 186], 102: 87, 103: [2, 186], 104: [2, 186], 105: [2, 186], 108: 88, 109: [2, 186], 110: 69, 117: [2, 186], 125: [2, 186], 127: [2, 186], 128: [2, 186], 131: [1, 78], 132: [2, 186], 133: [2, 186], 134: [2, 186], 135: [2, 186], 136: [2, 186]},
                    {1: [2, 187], 6: [2, 187], 25: [2, 187], 26: [2, 187], 49: [2, 187], 54: [2, 187], 57: [2, 187], 66: [2, 72], 67: [2, 72], 68: [2, 72], 70: [2, 72], 72: [2, 187], 73: [2, 72], 77: [2, 187], 83: [2, 72], 84: [2, 72], 85: [2, 187], 90: [2, 187], 92: [2, 187], 101: [2, 187], 103: [2, 187], 104: [2, 187], 105: [2, 187], 109: [2, 187], 117: [2, 187], 125: [2, 187], 127: [2, 187], 128: [2, 187], 131: [2, 187], 132: [2, 187], 133: [2, 187], 134: [2, 187], 135: [2, 187], 136: [2, 187]},
                    {62: 93, 66: [1, 95], 67: [1, 96], 68: [1, 97], 69: 98, 70: [1, 99], 73: [1, 100], 80: 92, 83: [1, 94], 84: [2, 107]},
                    {62: 102, 66: [1, 95], 67: [1, 96], 68: [1, 97], 69: 98, 70: [1, 99], 73: [1, 100], 80: 101, 83: [1, 94], 84: [2, 107]},
                    {66: [2, 75], 67: [2, 75], 68: [2, 75], 70: [2, 75], 73: [2, 75], 83: [2, 75], 84: [2, 75]},
                    {1: [2, 188], 6: [2, 188], 25: [2, 188], 26: [2, 188], 49: [2, 188], 54: [2, 188], 57: [2, 188], 66: [2, 72], 67: [2, 72], 68: [2, 72], 70: [2, 72], 72: [2, 188], 73: [2, 72], 77: [2, 188], 83: [2, 72], 84: [2, 72], 85: [2, 188], 90: [2, 188], 92: [2, 188], 101: [2, 188], 103: [2, 188], 104: [2, 188], 105: [2, 188], 109: [2, 188], 117: [2, 188], 125: [2, 188], 127: [2, 188], 128: [2, 188], 131: [2, 188], 132: [2, 188], 133: [2, 188], 134: [2, 188], 135: [2, 188], 136: [2, 188]},
                    {1: [2, 189], 6: [2, 189], 25: [2, 189], 26: [2, 189], 49: [2, 189], 54: [2, 189], 57: [2, 189], 72: [2, 189], 77: [2, 189], 85: [2, 189], 90: [2, 189], 92: [2, 189], 101: [2, 189], 103: [2, 189], 104: [2, 189], 105: [2, 189], 109: [2, 189], 117: [2, 189], 125: [2, 189], 127: [2, 189], 128: [2, 189], 131: [2, 189], 132: [2, 189], 133: [2, 189], 134: [2, 189], 135: [2, 189], 136: [2, 189]},
                    {1: [2, 190], 6: [2, 190], 25: [2, 190], 26: [2, 190], 49: [2, 190], 54: [2, 190], 57: [2, 190], 72: [2, 190], 77: [2, 190], 85: [2, 190], 90: [2, 190], 92: [2, 190], 101: [2, 190], 103: [2, 190], 104: [2, 190], 105: [2, 190], 109: [2, 190], 117: [2, 190], 125: [2, 190], 127: [2, 190], 128: [2, 190], 131: [2, 190], 132: [2, 190], 133: [2, 190], 134: [2, 190], 135: [2, 190], 136: [2, 190]},
                    {8: 206, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 207], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 208, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {5: 209, 25: [1, 5], 124: [1, 210]},
                    {1: [2, 132], 6: [2, 132], 25: [2, 132], 26: [2, 132], 49: [2, 132], 54: [2, 132], 57: [2, 132], 72: [2, 132], 77: [2, 132], 85: [2, 132], 90: [2, 132], 92: [2, 132], 96: 211, 97: [1, 212], 98: [1, 213], 101: [2, 132], 103: [2, 132], 104: [2, 132], 105: [2, 132], 109: [2, 132], 117: [2, 132], 125: [2, 132], 127: [2, 132], 128: [2, 132], 131: [2, 132], 132: [2, 132], 133: [2, 132], 134: [2, 132], 135: [2, 132], 136: [2, 132]},
                    {1: [2, 144], 6: [2, 144], 25: [2, 144], 26: [2, 144], 49: [2, 144], 54: [2, 144], 57: [2, 144], 72: [2, 144], 77: [2, 144], 85: [2, 144], 90: [2, 144], 92: [2, 144], 101: [2, 144], 103: [2, 144], 104: [2, 144], 105: [2, 144], 109: [2, 144], 117: [2, 144], 125: [2, 144], 127: [2, 144], 128: [2, 144], 131: [2, 144], 132: [2, 144], 133: [2, 144], 134: [2, 144], 135: [2, 144], 136: [2, 144]},
                    {1: [2, 152], 6: [2, 152], 25: [2, 152], 26: [2, 152], 49: [2, 152], 54: [2, 152], 57: [2, 152], 72: [2, 152], 77: [2, 152], 85: [2, 152], 90: [2, 152], 92: [2, 152], 101: [2, 152], 103: [2, 152], 104: [2, 152], 105: [2, 152], 109: [2, 152], 117: [2, 152], 125: [2, 152], 127: [2, 152], 128: [2, 152], 131: [2, 152], 132: [2, 152], 133: [2, 152], 134: [2, 152], 135: [2, 152], 136: [2, 152]},
                    {25: [1, 214], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {119: 215, 121: 216, 122: [1, 217]},
                    {1: [2, 96], 6: [2, 96], 25: [2, 96], 26: [2, 96], 49: [2, 96], 54: [2, 96], 57: [2, 96], 72: [2, 96], 77: [2, 96], 85: [2, 96], 90: [2, 96], 92: [2, 96], 101: [2, 96], 103: [2, 96], 104: [2, 96], 105: [2, 96], 109: [2, 96], 117: [2, 96], 125: [2, 96], 127: [2, 96], 128: [2, 96], 131: [2, 96], 132: [2, 96], 133: [2, 96], 134: [2, 96], 135: [2, 96], 136: [2, 96]},
                    {8: 218, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 99], 5: 219, 6: [2, 99], 25: [1, 5], 26: [2, 99], 49: [2, 99], 54: [2, 99], 57: [2, 99], 66: [2, 72], 67: [2, 72], 68: [2, 72], 70: [2, 72], 72: [2, 99], 73: [2, 72], 77: [2, 99], 79: [1, 220], 83: [2, 72], 84: [2, 72], 85: [2, 99], 90: [2, 99], 92: [2, 99], 101: [2, 99], 103: [2, 99], 104: [2, 99], 105: [2, 99], 109: [2, 99], 117: [2, 99], 125: [2, 99], 127: [2, 99], 128: [2, 99], 131: [2, 99], 132: [2, 99], 133: [2, 99], 134: [2, 99], 135: [2, 99], 136: [2, 99]},
                    {1: [2, 137], 6: [2, 137], 25: [2, 137], 26: [2, 137], 49: [2, 137], 54: [2, 137], 57: [2, 137], 72: [2, 137], 77: [2, 137], 85: [2, 137], 90: [2, 137], 92: [2, 137], 101: [2, 137], 102: 87, 103: [2, 137], 104: [2, 137], 105: [2, 137], 108: 88, 109: [2, 137], 110: 69, 117: [2, 137], 125: [2, 137], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 46], 6: [2, 46], 26: [2, 46], 101: [2, 46], 102: 87, 103: [2, 46], 105: [2, 46], 108: 88, 109: [2, 46], 110: 69, 125: [2, 46], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [1, 74], 101: [1, 221]},
                    {4: 222, 7: 4, 8: 6, 9: 7, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 128], 25: [2, 128], 54: [2, 128], 57: [1, 224], 90: [2, 128], 91: 223, 92: [1, 191], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 114], 6: [2, 114], 25: [2, 114], 26: [2, 114], 40: [2, 114], 49: [2, 114], 54: [2, 114], 57: [2, 114], 66: [2, 114], 67: [2, 114], 68: [2, 114], 70: [2, 114], 72: [2, 114], 73: [2, 114], 77: [2, 114], 83: [2, 114], 84: [2, 114], 85: [2, 114], 90: [2, 114], 92: [2, 114], 101: [2, 114], 103: [2, 114], 104: [2, 114], 105: [2, 114], 109: [2, 114], 115: [2, 114], 116: [2, 114], 117: [2, 114], 125: [2, 114], 127: [2, 114], 128: [2, 114], 131: [2, 114], 132: [2, 114], 133: [2, 114], 134: [2, 114], 135: [2, 114], 136: [2, 114]},
                    {6: [2, 53], 25: [2, 53], 53: 225, 54: [1, 226], 90: [2, 53]},
                    {6: [2, 123], 25: [2, 123], 26: [2, 123], 54: [2, 123], 85: [2, 123], 90: [2, 123]},
                    {8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 146], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 86: 227, 87: [1, 58], 88: [1, 59], 89: [1, 57], 93: 145, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 129], 25: [2, 129], 26: [2, 129], 54: [2, 129], 85: [2, 129], 90: [2, 129]},
                    {1: [2, 113], 6: [2, 113], 25: [2, 113], 26: [2, 113], 40: [2, 113], 43: [2, 113], 49: [2, 113], 54: [2, 113], 57: [2, 113], 66: [2, 113], 67: [2, 113], 68: [2, 113], 70: [2, 113], 72: [2, 113], 73: [2, 113], 77: [2, 113], 79: [2, 113], 83: [2, 113], 84: [2, 113], 85: [2, 113], 90: [2, 113], 92: [2, 113], 101: [2, 113], 103: [2, 113], 104: [2, 113], 105: [2, 113], 109: [2, 113], 115: [2, 113], 116: [2, 113], 117: [2, 113], 125: [2, 113], 127: [2, 113], 128: [2, 113], 129: [2, 113], 130: [2, 113], 131: [2, 113], 132: [2, 113], 133: [2, 113], 134: [2, 113], 135: [2, 113], 136: [2, 113], 137: [2, 113]},
                    {5: 228, 25: [1, 5], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 140], 6: [2, 140], 25: [2, 140], 26: [2, 140], 49: [2, 140], 54: [2, 140], 57: [2, 140], 72: [2, 140], 77: [2, 140], 85: [2, 140], 90: [2, 140], 92: [2, 140], 101: [2, 140], 102: 87, 103: [1, 65], 104: [1, 229], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 140], 125: [2, 140], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 142], 6: [2, 142], 25: [2, 142], 26: [2, 142], 49: [2, 142], 54: [2, 142], 57: [2, 142], 72: [2, 142], 77: [2, 142], 85: [2, 142], 90: [2, 142], 92: [2, 142], 101: [2, 142], 102: 87, 103: [1, 65], 104: [1, 230], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 142], 125: [2, 142], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 148], 6: [2, 148], 25: [2, 148], 26: [2, 148], 49: [2, 148], 54: [2, 148], 57: [2, 148], 72: [2, 148], 77: [2, 148], 85: [2, 148], 90: [2, 148], 92: [2, 148], 101: [2, 148], 103: [2, 148], 104: [2, 148], 105: [2, 148], 109: [2, 148], 117: [2, 148], 125: [2, 148], 127: [2, 148], 128: [2, 148], 131: [2, 148], 132: [2, 148], 133: [2, 148], 134: [2, 148], 135: [2, 148], 136: [2, 148]},
                    {1: [2, 149], 6: [2, 149], 25: [2, 149], 26: [2, 149], 49: [2, 149], 54: [2, 149], 57: [2, 149], 72: [2, 149], 77: [2, 149], 85: [2, 149], 90: [2, 149], 92: [2, 149], 101: [2, 149], 102: 87, 103: [1, 65], 104: [2, 149], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 149], 125: [2, 149], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 153], 6: [2, 153], 25: [2, 153], 26: [2, 153], 49: [2, 153], 54: [2, 153], 57: [2, 153], 72: [2, 153], 77: [2, 153], 85: [2, 153], 90: [2, 153], 92: [2, 153], 101: [2, 153], 103: [2, 153], 104: [2, 153], 105: [2, 153], 109: [2, 153], 117: [2, 153], 125: [2, 153], 127: [2, 153], 128: [2, 153], 131: [2, 153], 132: [2, 153], 133: [2, 153], 134: [2, 153], 135: [2, 153], 136: [2, 153]},
                    {115: [2, 155], 116: [2, 155]},
                    {27: 158, 28: [1, 73], 44: 159, 58: 160, 59: 161, 75: [1, 70], 88: [1, 113], 89: [1, 114], 112: 231, 114: 157},
                    {54: [1, 232], 115: [2, 161], 116: [2, 161]},
                    {54: [2, 157], 115: [2, 157], 116: [2, 157]},
                    {54: [2, 158], 115: [2, 158], 116: [2, 158]},
                    {54: [2, 159], 115: [2, 159], 116: [2, 159]},
                    {54: [2, 160], 115: [2, 160], 116: [2, 160]},
                    {1: [2, 154], 6: [2, 154], 25: [2, 154], 26: [2, 154], 49: [2, 154], 54: [2, 154], 57: [2, 154], 72: [2, 154], 77: [2, 154], 85: [2, 154], 90: [2, 154], 92: [2, 154], 101: [2, 154], 103: [2, 154], 104: [2, 154], 105: [2, 154], 109: [2, 154], 117: [2, 154], 125: [2, 154], 127: [2, 154], 128: [2, 154], 131: [2, 154], 132: [2, 154], 133: [2, 154], 134: [2, 154], 135: [2, 154], 136: [2, 154]},
                    {8: 233, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 234, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 53], 25: [2, 53], 53: 235, 54: [1, 236], 77: [2, 53]},
                    {6: [2, 91], 25: [2, 91], 26: [2, 91], 54: [2, 91], 77: [2, 91]},
                    {6: [2, 39], 25: [2, 39], 26: [2, 39], 43: [1, 237], 54: [2, 39], 77: [2, 39]},
                    {6: [2, 42], 25: [2, 42], 26: [2, 42], 54: [2, 42], 77: [2, 42]},
                    {6: [2, 43], 25: [2, 43], 26: [2, 43], 43: [2, 43], 54: [2, 43], 77: [2, 43]},
                    {6: [2, 44], 25: [2, 44], 26: [2, 44], 43: [2, 44], 54: [2, 44], 77: [2, 44]},
                    {6: [2, 45], 25: [2, 45], 26: [2, 45], 43: [2, 45], 54: [2, 45], 77: [2, 45]},
                    {1: [2, 5], 6: [2, 5], 26: [2, 5], 101: [2, 5]},
                    {1: [2, 25], 6: [2, 25], 25: [2, 25], 26: [2, 25], 49: [2, 25], 54: [2, 25], 57: [2, 25], 72: [2, 25], 77: [2, 25], 85: [2, 25], 90: [2, 25], 92: [2, 25], 97: [2, 25], 98: [2, 25], 101: [2, 25], 103: [2, 25], 104: [2, 25], 105: [2, 25], 109: [2, 25], 117: [2, 25], 120: [2, 25], 122: [2, 25], 125: [2, 25], 127: [2, 25], 128: [2, 25], 131: [2, 25], 132: [2, 25], 133: [2, 25], 134: [2, 25], 135: [2, 25], 136: [2, 25]},
                    {1: [2, 192], 6: [2, 192], 25: [2, 192], 26: [2, 192], 49: [2, 192], 54: [2, 192], 57: [2, 192], 72: [2, 192], 77: [2, 192], 85: [2, 192], 90: [2, 192], 92: [2, 192], 101: [2, 192], 102: 87, 103: [2, 192], 104: [2, 192], 105: [2, 192], 108: 88, 109: [2, 192], 110: 69, 117: [2, 192], 125: [2, 192], 127: [2, 192], 128: [2, 192], 131: [1, 78], 132: [1, 81], 133: [2, 192], 134: [2, 192], 135: [2, 192], 136: [2, 192]},
                    {1: [2, 193], 6: [2, 193], 25: [2, 193], 26: [2, 193], 49: [2, 193], 54: [2, 193], 57: [2, 193], 72: [2, 193], 77: [2, 193], 85: [2, 193], 90: [2, 193], 92: [2, 193], 101: [2, 193], 102: 87, 103: [2, 193], 104: [2, 193], 105: [2, 193], 108: 88, 109: [2, 193], 110: 69, 117: [2, 193], 125: [2, 193], 127: [2, 193], 128: [2, 193], 131: [1, 78], 132: [1, 81], 133: [2, 193], 134: [2, 193], 135: [2, 193], 136: [2, 193]},
                    {1: [2, 194], 6: [2, 194], 25: [2, 194], 26: [2, 194], 49: [2, 194], 54: [2, 194], 57: [2, 194], 72: [2, 194], 77: [2, 194], 85: [2, 194], 90: [2, 194], 92: [2, 194], 101: [2, 194], 102: 87, 103: [2, 194], 104: [2, 194], 105: [2, 194], 108: 88, 109: [2, 194], 110: 69, 117: [2, 194], 125: [2, 194], 127: [2, 194], 128: [2, 194], 131: [1, 78], 132: [2, 194], 133: [2, 194], 134: [2, 194], 135: [2, 194], 136: [2, 194]},
                    {1: [2, 195], 6: [2, 195], 25: [2, 195], 26: [2, 195], 49: [2, 195], 54: [2, 195], 57: [2, 195], 72: [2, 195], 77: [2, 195], 85: [2, 195], 90: [2, 195], 92: [2, 195], 101: [2, 195], 102: 87, 103: [2, 195], 104: [2, 195], 105: [2, 195], 108: 88, 109: [2, 195], 110: 69, 117: [2, 195], 125: [2, 195], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [2, 195], 134: [2, 195], 135: [2, 195], 136: [2, 195]},
                    {1: [2, 196], 6: [2, 196], 25: [2, 196], 26: [2, 196], 49: [2, 196], 54: [2, 196], 57: [2, 196], 72: [2, 196], 77: [2, 196], 85: [2, 196], 90: [2, 196], 92: [2, 196], 101: [2, 196], 102: 87, 103: [2, 196], 104: [2, 196], 105: [2, 196], 108: 88, 109: [2, 196], 110: 69, 117: [2, 196], 125: [2, 196], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [2, 196], 135: [2, 196], 136: [1, 85]},
                    {1: [2, 197], 6: [2, 197], 25: [2, 197], 26: [2, 197], 49: [2, 197], 54: [2, 197], 57: [2, 197], 72: [2, 197], 77: [2, 197], 85: [2, 197], 90: [2, 197], 92: [2, 197], 101: [2, 197], 102: 87, 103: [2, 197], 104: [2, 197], 105: [2, 197], 108: 88, 109: [2, 197], 110: 69, 117: [2, 197], 125: [2, 197], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [2, 197], 136: [1, 85]},
                    {1: [2, 198], 6: [2, 198], 25: [2, 198], 26: [2, 198], 49: [2, 198], 54: [2, 198], 57: [2, 198], 72: [2, 198], 77: [2, 198], 85: [2, 198], 90: [2, 198], 92: [2, 198], 101: [2, 198], 102: 87, 103: [2, 198], 104: [2, 198], 105: [2, 198], 108: 88, 109: [2, 198], 110: 69, 117: [2, 198], 125: [2, 198], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [2, 198], 135: [2, 198], 136: [2, 198]},
                    {1: [2, 183], 6: [2, 183], 25: [2, 183], 26: [2, 183], 49: [2, 183], 54: [2, 183], 57: [2, 183], 72: [2, 183], 77: [2, 183], 85: [2, 183], 90: [2, 183], 92: [2, 183], 101: [2, 183], 102: 87, 103: [1, 65], 104: [2, 183], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 183], 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 182], 6: [2, 182], 25: [2, 182], 26: [2, 182], 49: [2, 182], 54: [2, 182], 57: [2, 182], 72: [2, 182], 77: [2, 182], 85: [2, 182], 90: [2, 182], 92: [2, 182], 101: [2, 182], 102: 87, 103: [1, 65], 104: [2, 182], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 182], 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 103], 6: [2, 103], 25: [2, 103], 26: [2, 103], 49: [2, 103], 54: [2, 103], 57: [2, 103], 66: [2, 103], 67: [2, 103], 68: [2, 103], 70: [2, 103], 72: [2, 103], 73: [2, 103], 77: [2, 103], 83: [2, 103], 84: [2, 103], 85: [2, 103], 90: [2, 103], 92: [2, 103], 101: [2, 103], 103: [2, 103], 104: [2, 103], 105: [2, 103], 109: [2, 103], 117: [2, 103], 125: [2, 103], 127: [2, 103], 128: [2, 103], 131: [2, 103], 132: [2, 103], 133: [2, 103], 134: [2, 103], 135: [2, 103], 136: [2, 103]},
                    {1: [2, 80], 6: [2, 80], 25: [2, 80], 26: [2, 80], 40: [2, 80], 49: [2, 80], 54: [2, 80], 57: [2, 80], 66: [2, 80], 67: [2, 80], 68: [2, 80], 70: [2, 80], 72: [2, 80], 73: [2, 80], 77: [2, 80], 79: [2, 80], 83: [2, 80], 84: [2, 80], 85: [2, 80], 90: [2, 80], 92: [2, 80], 101: [2, 80], 103: [2, 80], 104: [2, 80], 105: [2, 80], 109: [2, 80], 117: [2, 80], 125: [2, 80], 127: [2, 80], 128: [2, 80], 129: [2, 80], 130: [2, 80], 131: [2, 80], 132: [2, 80], 133: [2, 80], 134: [2, 80], 135: [2, 80], 136: [2, 80], 137: [2, 80]},
                    {1: [2, 81], 6: [2, 81], 25: [2, 81], 26: [2, 81], 40: [2, 81], 49: [2, 81], 54: [2, 81], 57: [2, 81], 66: [2, 81], 67: [2, 81], 68: [2, 81], 70: [2, 81], 72: [2, 81], 73: [2, 81], 77: [2, 81], 79: [2, 81], 83: [2, 81], 84: [2, 81], 85: [2, 81], 90: [2, 81], 92: [2, 81], 101: [2, 81], 103: [2, 81], 104: [2, 81], 105: [2, 81], 109: [2, 81], 117: [2, 81], 125: [2, 81], 127: [2, 81], 128: [2, 81], 129: [2, 81], 130: [2, 81], 131: [2, 81], 132: [2, 81], 133: [2, 81], 134: [2, 81], 135: [2, 81], 136: [2, 81], 137: [2, 81]},
                    {1: [2, 82], 6: [2, 82], 25: [2, 82], 26: [2, 82], 40: [2, 82], 49: [2, 82], 54: [2, 82], 57: [2, 82], 66: [2, 82], 67: [2, 82], 68: [2, 82], 70: [2, 82], 72: [2, 82], 73: [2, 82], 77: [2, 82], 79: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82], 90: [2, 82], 92: [2, 82], 101: [2, 82], 103: [2, 82], 104: [2, 82], 105: [2, 82], 109: [2, 82], 117: [2, 82], 125: [2, 82], 127: [2, 82], 128: [2, 82], 129: [2, 82], 130: [2, 82], 131: [2, 82], 132: [2, 82], 133: [2, 82], 134: [2, 82], 135: [2, 82], 136: [2, 82], 137: [2, 82]},
                    {72: [1, 238]},
                    {57: [1, 192], 72: [2, 87], 91: 239, 92: [1, 191], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {72: [2, 88]},
                    {8: 240, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 72: [2, 122], 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {12: [2, 116], 28: [2, 116], 30: [2, 116], 31: [2, 116], 33: [2, 116], 34: [2, 116], 35: [2, 116], 36: [2, 116], 37: [2, 116], 38: [2, 116], 45: [2, 116], 46: [2, 116], 47: [2, 116], 51: [2, 116], 52: [2, 116], 72: [2, 116], 75: [2, 116], 78: [2, 116], 82: [2, 116], 87: [2, 116], 88: [2, 116], 89: [2, 116], 95: [2, 116], 99: [2, 116], 100: [2, 116], 103: [2, 116], 105: [2, 116], 107: [2, 116], 109: [2, 116], 118: [2, 116], 124: [2, 116], 126: [2, 116], 127: [2, 116], 128: [2, 116], 129: [2, 116], 130: [2, 116]},
                    {12: [2, 117], 28: [2, 117], 30: [2, 117], 31: [2, 117], 33: [2, 117], 34: [2, 117], 35: [2, 117], 36: [2, 117], 37: [2, 117], 38: [2, 117], 45: [2, 117], 46: [2, 117], 47: [2, 117], 51: [2, 117], 52: [2, 117], 72: [2, 117], 75: [2, 117], 78: [2, 117], 82: [2, 117], 87: [2, 117], 88: [2, 117], 89: [2, 117], 95: [2, 117], 99: [2, 117], 100: [2, 117], 103: [2, 117], 105: [2, 117], 107: [2, 117], 109: [2, 117], 118: [2, 117], 124: [2, 117], 126: [2, 117], 127: [2, 117], 128: [2, 117], 129: [2, 117], 130: [2, 117]},
                    {1: [2, 86], 6: [2, 86], 25: [2, 86], 26: [2, 86], 40: [2, 86], 49: [2, 86], 54: [2, 86], 57: [2, 86], 66: [2, 86], 67: [2, 86], 68: [2, 86], 70: [2, 86], 72: [2, 86], 73: [2, 86], 77: [2, 86], 79: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86], 90: [2, 86], 92: [2, 86], 101: [2, 86], 103: [2, 86], 104: [2, 86], 105: [2, 86], 109: [2, 86], 117: [2, 86], 125: [2, 86], 127: [2, 86], 128: [2, 86], 129: [2, 86], 130: [2, 86], 131: [2, 86], 132: [2, 86], 133: [2, 86], 134: [2, 86], 135: [2, 86], 136: [2, 86], 137: [2, 86]},
                    {1: [2, 104], 6: [2, 104], 25: [2, 104], 26: [2, 104], 49: [2, 104], 54: [2, 104], 57: [2, 104], 66: [2, 104], 67: [2, 104], 68: [2, 104], 70: [2, 104], 72: [2, 104], 73: [2, 104], 77: [2, 104], 83: [2, 104], 84: [2, 104], 85: [2, 104], 90: [2, 104], 92: [2, 104], 101: [2, 104], 103: [2, 104], 104: [2, 104], 105: [2, 104], 109: [2, 104], 117: [2, 104], 125: [2, 104], 127: [2, 104], 128: [2, 104], 131: [2, 104], 132: [2, 104], 133: [2, 104], 134: [2, 104], 135: [2, 104], 136: [2, 104]},
                    {1: [2, 36], 6: [2, 36], 25: [2, 36], 26: [2, 36], 49: [2, 36], 54: [2, 36], 57: [2, 36], 72: [2, 36], 77: [2, 36], 85: [2, 36], 90: [2, 36], 92: [2, 36], 101: [2, 36], 102: 87, 103: [2, 36], 104: [2, 36], 105: [2, 36], 108: 88, 109: [2, 36], 110: 69, 117: [2, 36], 125: [2, 36], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {8: 241, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 242, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 109], 6: [2, 109], 25: [2, 109], 26: [2, 109], 49: [2, 109], 54: [2, 109], 57: [2, 109], 66: [2, 109], 67: [2, 109], 68: [2, 109], 70: [2, 109], 72: [2, 109], 73: [2, 109], 77: [2, 109], 83: [2, 109], 84: [2, 109], 85: [2, 109], 90: [2, 109], 92: [2, 109], 101: [2, 109], 103: [2, 109], 104: [2, 109], 105: [2, 109], 109: [2, 109], 117: [2, 109], 125: [2, 109], 127: [2, 109], 128: [2, 109], 131: [2, 109], 132: [2, 109], 133: [2, 109], 134: [2, 109], 135: [2, 109], 136: [2, 109]},
                    {6: [2, 53], 25: [2, 53], 53: 243, 54: [1, 226], 85: [2, 53]},
                    {6: [2, 128], 25: [2, 128], 26: [2, 128], 54: [2, 128], 57: [1, 244], 85: [2, 128], 90: [2, 128], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {50: 245, 51: [1, 60], 52: [1, 61]},
                    {6: [2, 54], 25: [2, 54], 26: [2, 54], 27: 109, 28: [1, 73], 44: 110, 55: 246, 56: 108, 58: 111, 59: 112, 75: [1, 70], 88: [1, 113], 89: [1, 114]},
                    {6: [1, 247], 25: [1, 248]},
                    {6: [2, 61], 25: [2, 61], 26: [2, 61], 49: [2, 61], 54: [2, 61]},
                    {8: 249, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 199], 6: [2, 199], 25: [2, 199], 26: [2, 199], 49: [2, 199], 54: [2, 199], 57: [2, 199], 72: [2, 199], 77: [2, 199], 85: [2, 199], 90: [2, 199], 92: [2, 199], 101: [2, 199], 102: 87, 103: [2, 199], 104: [2, 199], 105: [2, 199], 108: 88, 109: [2, 199], 110: 69, 117: [2, 199], 125: [2, 199], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {8: 250, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 201], 6: [2, 201], 25: [2, 201], 26: [2, 201], 49: [2, 201], 54: [2, 201], 57: [2, 201], 72: [2, 201], 77: [2, 201], 85: [2, 201], 90: [2, 201], 92: [2, 201], 101: [2, 201], 102: 87, 103: [2, 201], 104: [2, 201], 105: [2, 201], 108: 88, 109: [2, 201], 110: 69, 117: [2, 201], 125: [2, 201], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 181], 6: [2, 181], 25: [2, 181], 26: [2, 181], 49: [2, 181], 54: [2, 181], 57: [2, 181], 72: [2, 181], 77: [2, 181], 85: [2, 181], 90: [2, 181], 92: [2, 181], 101: [2, 181], 103: [2, 181], 104: [2, 181], 105: [2, 181], 109: [2, 181], 117: [2, 181], 125: [2, 181], 127: [2, 181], 128: [2, 181], 131: [2, 181], 132: [2, 181], 133: [2, 181], 134: [2, 181], 135: [2, 181], 136: [2, 181]},
                    {8: 251, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 133], 6: [2, 133], 25: [2, 133], 26: [2, 133], 49: [2, 133], 54: [2, 133], 57: [2, 133], 72: [2, 133], 77: [2, 133], 85: [2, 133], 90: [2, 133], 92: [2, 133], 97: [1, 252], 101: [2, 133], 103: [2, 133], 104: [2, 133], 105: [2, 133], 109: [2, 133], 117: [2, 133], 125: [2, 133], 127: [2, 133], 128: [2, 133], 131: [2, 133], 132: [2, 133], 133: [2, 133], 134: [2, 133], 135: [2, 133], 136: [2, 133]},
                    {5: 253, 25: [1, 5]},
                    {27: 254, 28: [1, 73]},
                    {119: 255, 121: 216, 122: [1, 217]},
                    {26: [1, 256], 120: [1, 257], 121: 258, 122: [1, 217]},
                    {26: [2, 174], 120: [2, 174], 122: [2, 174]},
                    {8: 260, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 94: 259, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 97], 5: 261, 6: [2, 97], 25: [1, 5], 26: [2, 97], 49: [2, 97], 54: [2, 97], 57: [2, 97], 72: [2, 97], 77: [2, 97], 85: [2, 97], 90: [2, 97], 92: [2, 97], 101: [2, 97], 102: 87, 103: [1, 65], 104: [2, 97], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 97], 125: [2, 97], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 100], 6: [2, 100], 25: [2, 100], 26: [2, 100], 49: [2, 100], 54: [2, 100], 57: [2, 100], 72: [2, 100], 77: [2, 100], 85: [2, 100], 90: [2, 100], 92: [2, 100], 101: [2, 100], 103: [2, 100], 104: [2, 100], 105: [2, 100], 109: [2, 100], 117: [2, 100], 125: [2, 100], 127: [2, 100], 128: [2, 100], 131: [2, 100], 132: [2, 100], 133: [2, 100], 134: [2, 100], 135: [2, 100], 136: [2, 100]},
                    {8: 262, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 138], 6: [2, 138], 25: [2, 138], 26: [2, 138], 49: [2, 138], 54: [2, 138], 57: [2, 138], 66: [2, 138], 67: [2, 138], 68: [2, 138], 70: [2, 138], 72: [2, 138], 73: [2, 138], 77: [2, 138], 83: [2, 138], 84: [2, 138], 85: [2, 138], 90: [2, 138], 92: [2, 138], 101: [2, 138], 103: [2, 138], 104: [2, 138], 105: [2, 138], 109: [2, 138], 117: [2, 138], 125: [2, 138], 127: [2, 138], 128: [2, 138], 131: [2, 138], 132: [2, 138], 133: [2, 138], 134: [2, 138], 135: [2, 138], 136: [2, 138]},
                    {6: [1, 74], 26: [1, 263]},
                    {8: 264, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 67], 12: [2, 117], 25: [2, 67], 28: [2, 117], 30: [2, 117], 31: [2, 117], 33: [2, 117], 34: [2, 117], 35: [2, 117], 36: [2, 117], 37: [2, 117], 38: [2, 117], 45: [2, 117], 46: [2, 117], 47: [2, 117], 51: [2, 117], 52: [2, 117], 54: [2, 67], 75: [2, 117], 78: [2, 117], 82: [2, 117], 87: [2, 117], 88: [2, 117], 89: [2, 117], 90: [2, 67], 95: [2, 117], 99: [2, 117], 100: [2, 117], 103: [2, 117], 105: [2, 117], 107: [2, 117], 109: [2, 117], 118: [2, 117], 124: [2, 117], 126: [2, 117], 127: [2, 117], 128: [2, 117], 129: [2, 117], 130: [2, 117]},
                    {6: [1, 266], 25: [1, 267], 90: [1, 265]},
                    {6: [2, 54], 8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [2, 54], 26: [2, 54], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 85: [2, 54], 87: [1, 58], 88: [1, 59], 89: [1, 57], 90: [2, 54], 93: 268, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 53], 25: [2, 53], 26: [2, 53], 53: 269, 54: [1, 226]},
                    {1: [2, 178], 6: [2, 178], 25: [2, 178], 26: [2, 178], 49: [2, 178], 54: [2, 178], 57: [2, 178], 72: [2, 178], 77: [2, 178], 85: [2, 178], 90: [2, 178], 92: [2, 178], 101: [2, 178], 103: [2, 178], 104: [2, 178], 105: [2, 178], 109: [2, 178], 117: [2, 178], 120: [2, 178], 125: [2, 178], 127: [2, 178], 128: [2, 178], 131: [2, 178], 132: [2, 178], 133: [2, 178], 134: [2, 178], 135: [2, 178], 136: [2, 178]},
                    {8: 270, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 271, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {115: [2, 156], 116: [2, 156]},
                    {27: 158, 28: [1, 73], 44: 159, 58: 160, 59: 161, 75: [1, 70], 88: [1, 113], 89: [1, 114], 114: 272},
                    {1: [2, 163], 6: [2, 163], 25: [2, 163], 26: [2, 163], 49: [2, 163], 54: [2, 163], 57: [2, 163], 72: [2, 163], 77: [2, 163], 85: [2, 163], 90: [2, 163], 92: [2, 163], 101: [2, 163], 102: 87, 103: [2, 163], 104: [1, 273], 105: [2, 163], 108: 88, 109: [2, 163], 110: 69, 117: [1, 274], 125: [2, 163], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 164], 6: [2, 164], 25: [2, 164], 26: [2, 164], 49: [2, 164], 54: [2, 164], 57: [2, 164], 72: [2, 164], 77: [2, 164], 85: [2, 164], 90: [2, 164], 92: [2, 164], 101: [2, 164], 102: 87, 103: [2, 164], 104: [1, 275], 105: [2, 164], 108: 88, 109: [2, 164], 110: 69, 117: [2, 164], 125: [2, 164], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [1, 277], 25: [1, 278], 77: [1, 276]},
                    {6: [2, 54], 11: 168, 25: [2, 54], 26: [2, 54], 27: 169, 28: [1, 73], 29: 170, 30: [1, 71], 31: [1, 72], 41: 279, 42: 167, 44: 171, 46: [1, 46], 77: [2, 54], 88: [1, 113]},
                    {8: 280, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 281], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 85], 6: [2, 85], 25: [2, 85], 26: [2, 85], 40: [2, 85], 49: [2, 85], 54: [2, 85], 57: [2, 85], 66: [2, 85], 67: [2, 85], 68: [2, 85], 70: [2, 85], 72: [2, 85], 73: [2, 85], 77: [2, 85], 79: [2, 85], 83: [2, 85], 84: [2, 85], 85: [2, 85], 90: [2, 85], 92: [2, 85], 101: [2, 85], 103: [2, 85], 104: [2, 85], 105: [2, 85], 109: [2, 85], 117: [2, 85], 125: [2, 85], 127: [2, 85], 128: [2, 85], 129: [2, 85], 130: [2, 85], 131: [2, 85], 132: [2, 85], 133: [2, 85], 134: [2, 85], 135: [2, 85], 136: [2, 85], 137: [2, 85]},
                    {8: 282, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 72: [2, 120], 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {72: [2, 121], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 37], 6: [2, 37], 25: [2, 37], 26: [2, 37], 49: [2, 37], 54: [2, 37], 57: [2, 37], 72: [2, 37], 77: [2, 37], 85: [2, 37], 90: [2, 37], 92: [2, 37], 101: [2, 37], 102: 87, 103: [2, 37], 104: [2, 37], 105: [2, 37], 108: 88, 109: [2, 37], 110: 69, 117: [2, 37], 125: [2, 37], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {26: [1, 283], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [1, 266], 25: [1, 267], 85: [1, 284]},
                    {6: [2, 67], 25: [2, 67], 26: [2, 67], 54: [2, 67], 85: [2, 67], 90: [2, 67]},
                    {5: 285, 25: [1, 5]},
                    {6: [2, 57], 25: [2, 57], 26: [2, 57], 49: [2, 57], 54: [2, 57]},
                    {27: 109, 28: [1, 73], 44: 110, 55: 286, 56: 108, 58: 111, 59: 112, 75: [1, 70], 88: [1, 113], 89: [1, 114]},
                    {6: [2, 55], 25: [2, 55], 26: [2, 55], 27: 109, 28: [1, 73], 44: 110, 48: 287, 54: [2, 55], 55: 107, 56: 108, 58: 111, 59: 112, 75: [1, 70], 88: [1, 113], 89: [1, 114]},
                    {6: [2, 62], 25: [2, 62], 26: [2, 62], 49: [2, 62], 54: [2, 62], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {26: [1, 288], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {5: 289, 25: [1, 5], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {5: 290, 25: [1, 5]},
                    {1: [2, 134], 6: [2, 134], 25: [2, 134], 26: [2, 134], 49: [2, 134], 54: [2, 134], 57: [2, 134], 72: [2, 134], 77: [2, 134], 85: [2, 134], 90: [2, 134], 92: [2, 134], 101: [2, 134], 103: [2, 134], 104: [2, 134], 105: [2, 134], 109: [2, 134], 117: [2, 134], 125: [2, 134], 127: [2, 134], 128: [2, 134], 131: [2, 134], 132: [2, 134], 133: [2, 134], 134: [2, 134], 135: [2, 134], 136: [2, 134]},
                    {5: 291, 25: [1, 5]},
                    {26: [1, 292], 120: [1, 293], 121: 258, 122: [1, 217]},
                    {1: [2, 172], 6: [2, 172], 25: [2, 172], 26: [2, 172], 49: [2, 172], 54: [2, 172], 57: [2, 172], 72: [2, 172], 77: [2, 172], 85: [2, 172], 90: [2, 172], 92: [2, 172], 101: [2, 172], 103: [2, 172], 104: [2, 172], 105: [2, 172], 109: [2, 172], 117: [2, 172], 125: [2, 172], 127: [2, 172], 128: [2, 172], 131: [2, 172], 132: [2, 172], 133: [2, 172], 134: [2, 172], 135: [2, 172], 136: [2, 172]},
                    {5: 294, 25: [1, 5]},
                    {26: [2, 175], 120: [2, 175], 122: [2, 175]},
                    {5: 295, 25: [1, 5], 54: [1, 296]},
                    {25: [2, 130], 54: [2, 130], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 98], 6: [2, 98], 25: [2, 98], 26: [2, 98], 49: [2, 98], 54: [2, 98], 57: [2, 98], 72: [2, 98], 77: [2, 98], 85: [2, 98], 90: [2, 98], 92: [2, 98], 101: [2, 98], 103: [2, 98], 104: [2, 98], 105: [2, 98], 109: [2, 98], 117: [2, 98], 125: [2, 98], 127: [2, 98], 128: [2, 98], 131: [2, 98], 132: [2, 98], 133: [2, 98], 134: [2, 98], 135: [2, 98], 136: [2, 98]},
                    {1: [2, 101], 5: 297, 6: [2, 101], 25: [1, 5], 26: [2, 101], 49: [2, 101], 54: [2, 101], 57: [2, 101], 72: [2, 101], 77: [2, 101], 85: [2, 101], 90: [2, 101], 92: [2, 101], 101: [2, 101], 102: 87, 103: [1, 65], 104: [2, 101], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 101], 125: [2, 101], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {101: [1, 298]},
                    {90: [1, 299], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 115], 6: [2, 115], 25: [2, 115], 26: [2, 115], 40: [2, 115], 49: [2, 115], 54: [2, 115], 57: [2, 115], 66: [2, 115], 67: [2, 115], 68: [2, 115], 70: [2, 115], 72: [2, 115], 73: [2, 115], 77: [2, 115], 83: [2, 115], 84: [2, 115], 85: [2, 115], 90: [2, 115], 92: [2, 115], 101: [2, 115], 103: [2, 115], 104: [2, 115], 105: [2, 115], 109: [2, 115], 115: [2, 115], 116: [2, 115], 117: [2, 115], 125: [2, 115], 127: [2, 115], 128: [2, 115], 131: [2, 115], 132: [2, 115], 133: [2, 115], 134: [2, 115], 135: [2, 115], 136: [2, 115]},
                    {8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 93: 300, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 200, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 25: [1, 146], 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 60: 147, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 86: 301, 87: [1, 58], 88: [1, 59], 89: [1, 57], 93: 145, 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [2, 124], 25: [2, 124], 26: [2, 124], 54: [2, 124], 85: [2, 124], 90: [2, 124]},
                    {6: [1, 266], 25: [1, 267], 26: [1, 302]},
                    {1: [2, 141], 6: [2, 141], 25: [2, 141], 26: [2, 141], 49: [2, 141], 54: [2, 141], 57: [2, 141], 72: [2, 141], 77: [2, 141], 85: [2, 141], 90: [2, 141], 92: [2, 141], 101: [2, 141], 102: 87, 103: [1, 65], 104: [2, 141], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 141], 125: [2, 141], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 143], 6: [2, 143], 25: [2, 143], 26: [2, 143], 49: [2, 143], 54: [2, 143], 57: [2, 143], 72: [2, 143], 77: [2, 143], 85: [2, 143], 90: [2, 143], 92: [2, 143], 101: [2, 143], 102: 87, 103: [1, 65], 104: [2, 143], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 117: [2, 143], 125: [2, 143], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {115: [2, 162], 116: [2, 162]},
                    {8: 303, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 304, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 305, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 89], 6: [2, 89], 25: [2, 89], 26: [2, 89], 40: [2, 89], 49: [2, 89], 54: [2, 89], 57: [2, 89], 66: [2, 89], 67: [2, 89], 68: [2, 89], 70: [2, 89], 72: [2, 89], 73: [2, 89], 77: [2, 89], 83: [2, 89], 84: [2, 89], 85: [2, 89], 90: [2, 89], 92: [2, 89], 101: [2, 89], 103: [2, 89], 104: [2, 89], 105: [2, 89], 109: [2, 89], 115: [2, 89], 116: [2, 89], 117: [2, 89], 125: [2, 89], 127: [2, 89], 128: [2, 89], 131: [2, 89], 132: [2, 89], 133: [2, 89], 134: [2, 89], 135: [2, 89], 136: [2, 89]},
                    {11: 168, 27: 169, 28: [1, 73], 29: 170, 30: [1, 71], 31: [1, 72], 41: 306, 42: 167, 44: 171, 46: [1, 46], 88: [1, 113]},
                    {6: [2, 90], 11: 168, 25: [2, 90], 26: [2, 90], 27: 169, 28: [1, 73], 29: 170, 30: [1, 71], 31: [1, 72], 41: 166, 42: 167, 44: 171, 46: [1, 46], 54: [2, 90], 76: 307, 88: [1, 113]},
                    {6: [2, 92], 25: [2, 92], 26: [2, 92], 54: [2, 92], 77: [2, 92]},
                    {6: [2, 40], 25: [2, 40], 26: [2, 40], 54: [2, 40], 77: [2, 40], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {8: 308, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {72: [2, 119], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 38], 6: [2, 38], 25: [2, 38], 26: [2, 38], 49: [2, 38], 54: [2, 38], 57: [2, 38], 72: [2, 38], 77: [2, 38], 85: [2, 38], 90: [2, 38], 92: [2, 38], 101: [2, 38], 103: [2, 38], 104: [2, 38], 105: [2, 38], 109: [2, 38], 117: [2, 38], 125: [2, 38], 127: [2, 38], 128: [2, 38], 131: [2, 38], 132: [2, 38], 133: [2, 38], 134: [2, 38], 135: [2, 38], 136: [2, 38]},
                    {1: [2, 110], 6: [2, 110], 25: [2, 110], 26: [2, 110], 49: [2, 110], 54: [2, 110], 57: [2, 110], 66: [2, 110], 67: [2, 110], 68: [2, 110], 70: [2, 110], 72: [2, 110], 73: [2, 110], 77: [2, 110], 83: [2, 110], 84: [2, 110], 85: [2, 110], 90: [2, 110], 92: [2, 110], 101: [2, 110], 103: [2, 110], 104: [2, 110], 105: [2, 110], 109: [2, 110], 117: [2, 110], 125: [2, 110], 127: [2, 110], 128: [2, 110], 131: [2, 110], 132: [2, 110], 133: [2, 110], 134: [2, 110], 135: [2, 110], 136: [2, 110]},
                    {1: [2, 49], 6: [2, 49], 25: [2, 49], 26: [2, 49], 49: [2, 49], 54: [2, 49], 57: [2, 49], 72: [2, 49], 77: [2, 49], 85: [2, 49], 90: [2, 49], 92: [2, 49], 101: [2, 49], 103: [2, 49], 104: [2, 49], 105: [2, 49], 109: [2, 49], 117: [2, 49], 125: [2, 49], 127: [2, 49], 128: [2, 49], 131: [2, 49], 132: [2, 49], 133: [2, 49], 134: [2, 49], 135: [2, 49], 136: [2, 49]},
                    {6: [2, 58], 25: [2, 58], 26: [2, 58], 49: [2, 58], 54: [2, 58]},
                    {6: [2, 53], 25: [2, 53], 26: [2, 53], 53: 309, 54: [1, 202]},
                    {1: [2, 200], 6: [2, 200], 25: [2, 200], 26: [2, 200], 49: [2, 200], 54: [2, 200], 57: [2, 200], 72: [2, 200], 77: [2, 200], 85: [2, 200], 90: [2, 200], 92: [2, 200], 101: [2, 200], 103: [2, 200], 104: [2, 200], 105: [2, 200], 109: [2, 200], 117: [2, 200], 125: [2, 200], 127: [2, 200], 128: [2, 200], 131: [2, 200], 132: [2, 200], 133: [2, 200], 134: [2, 200], 135: [2, 200], 136: [2, 200]},
                    {1: [2, 179], 6: [2, 179], 25: [2, 179], 26: [2, 179], 49: [2, 179], 54: [2, 179], 57: [2, 179], 72: [2, 179], 77: [2, 179], 85: [2, 179], 90: [2, 179], 92: [2, 179], 101: [2, 179], 103: [2, 179], 104: [2, 179], 105: [2, 179], 109: [2, 179], 117: [2, 179], 120: [2, 179], 125: [2, 179], 127: [2, 179], 128: [2, 179], 131: [2, 179], 132: [2, 179], 133: [2, 179], 134: [2, 179], 135: [2, 179], 136: [2, 179]},
                    {1: [2, 135], 6: [2, 135], 25: [2, 135], 26: [2, 135], 49: [2, 135], 54: [2, 135], 57: [2, 135], 72: [2, 135], 77: [2, 135], 85: [2, 135], 90: [2, 135], 92: [2, 135], 101: [2, 135], 103: [2, 135], 104: [2, 135], 105: [2, 135], 109: [2, 135], 117: [2, 135], 125: [2, 135], 127: [2, 135], 128: [2, 135], 131: [2, 135], 132: [2, 135], 133: [2, 135], 134: [2, 135], 135: [2, 135], 136: [2, 135]},
                    {1: [2, 136], 6: [2, 136], 25: [2, 136], 26: [2, 136], 49: [2, 136], 54: [2, 136], 57: [2, 136], 72: [2, 136], 77: [2, 136], 85: [2, 136], 90: [2, 136], 92: [2, 136], 97: [2, 136], 101: [2, 136], 103: [2, 136], 104: [2, 136], 105: [2, 136], 109: [2, 136], 117: [2, 136], 125: [2, 136], 127: [2, 136], 128: [2, 136], 131: [2, 136], 132: [2, 136], 133: [2, 136], 134: [2, 136], 135: [2, 136], 136: [2, 136]},
                    {1: [2, 170], 6: [2, 170], 25: [2, 170], 26: [2, 170], 49: [2, 170], 54: [2, 170], 57: [2, 170], 72: [2, 170], 77: [2, 170], 85: [2, 170], 90: [2, 170], 92: [2, 170], 101: [2, 170], 103: [2, 170], 104: [2, 170], 105: [2, 170], 109: [2, 170], 117: [2, 170], 125: [2, 170], 127: [2, 170], 128: [2, 170], 131: [2, 170], 132: [2, 170], 133: [2, 170], 134: [2, 170], 135: [2, 170], 136: [2, 170]},
                    {5: 310, 25: [1, 5]},
                    {26: [1, 311]},
                    {6: [1, 312], 26: [2, 176], 120: [2, 176], 122: [2, 176]},
                    {8: 313, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {1: [2, 102], 6: [2, 102], 25: [2, 102], 26: [2, 102], 49: [2, 102], 54: [2, 102], 57: [2, 102], 72: [2, 102], 77: [2, 102], 85: [2, 102], 90: [2, 102], 92: [2, 102], 101: [2, 102], 103: [2, 102], 104: [2, 102], 105: [2, 102], 109: [2, 102], 117: [2, 102], 125: [2, 102], 127: [2, 102], 128: [2, 102], 131: [2, 102], 132: [2, 102], 133: [2, 102], 134: [2, 102], 135: [2, 102], 136: [2, 102]},
                    {1: [2, 139], 6: [2, 139], 25: [2, 139], 26: [2, 139], 49: [2, 139], 54: [2, 139], 57: [2, 139], 66: [2, 139], 67: [2, 139], 68: [2, 139], 70: [2, 139], 72: [2, 139], 73: [2, 139], 77: [2, 139], 83: [2, 139], 84: [2, 139], 85: [2, 139], 90: [2, 139], 92: [2, 139], 101: [2, 139], 103: [2, 139], 104: [2, 139], 105: [2, 139], 109: [2, 139], 117: [2, 139], 125: [2, 139], 127: [2, 139], 128: [2, 139], 131: [2, 139], 132: [2, 139], 133: [2, 139], 134: [2, 139], 135: [2, 139], 136: [2, 139]},
                    {1: [2, 118], 6: [2, 118], 25: [2, 118], 26: [2, 118], 49: [2, 118], 54: [2, 118], 57: [2, 118], 66: [2, 118], 67: [2, 118], 68: [2, 118], 70: [2, 118], 72: [2, 118], 73: [2, 118], 77: [2, 118], 83: [2, 118], 84: [2, 118], 85: [2, 118], 90: [2, 118], 92: [2, 118], 101: [2, 118], 103: [2, 118], 104: [2, 118], 105: [2, 118], 109: [2, 118], 117: [2, 118], 125: [2, 118], 127: [2, 118], 128: [2, 118], 131: [2, 118], 132: [2, 118], 133: [2, 118], 134: [2, 118], 135: [2, 118], 136: [2, 118]},
                    {6: [2, 125], 25: [2, 125], 26: [2, 125], 54: [2, 125], 85: [2, 125], 90: [2, 125]},
                    {6: [2, 53], 25: [2, 53], 26: [2, 53], 53: 314, 54: [1, 226]},
                    {6: [2, 126], 25: [2, 126], 26: [2, 126], 54: [2, 126], 85: [2, 126], 90: [2, 126]},
                    {1: [2, 165], 6: [2, 165], 25: [2, 165], 26: [2, 165], 49: [2, 165], 54: [2, 165], 57: [2, 165], 72: [2, 165], 77: [2, 165], 85: [2, 165], 90: [2, 165], 92: [2, 165], 101: [2, 165], 102: 87, 103: [2, 165], 104: [2, 165], 105: [2, 165], 108: 88, 109: [2, 165], 110: 69, 117: [1, 315], 125: [2, 165], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 167], 6: [2, 167], 25: [2, 167], 26: [2, 167], 49: [2, 167], 54: [2, 167], 57: [2, 167], 72: [2, 167], 77: [2, 167], 85: [2, 167], 90: [2, 167], 92: [2, 167], 101: [2, 167], 102: 87, 103: [2, 167], 104: [1, 316], 105: [2, 167], 108: 88, 109: [2, 167], 110: 69, 117: [2, 167], 125: [2, 167], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 166], 6: [2, 166], 25: [2, 166], 26: [2, 166], 49: [2, 166], 54: [2, 166], 57: [2, 166], 72: [2, 166], 77: [2, 166], 85: [2, 166], 90: [2, 166], 92: [2, 166], 101: [2, 166], 102: 87, 103: [2, 166], 104: [2, 166], 105: [2, 166], 108: 88, 109: [2, 166], 110: 69, 117: [2, 166], 125: [2, 166], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [2, 93], 25: [2, 93], 26: [2, 93], 54: [2, 93], 77: [2, 93]},
                    {6: [2, 53], 25: [2, 53], 26: [2, 53], 53: 317, 54: [1, 236]},
                    {26: [1, 318], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [1, 247], 25: [1, 248], 26: [1, 319]},
                    {26: [1, 320]},
                    {1: [2, 173], 6: [2, 173], 25: [2, 173], 26: [2, 173], 49: [2, 173], 54: [2, 173], 57: [2, 173], 72: [2, 173], 77: [2, 173], 85: [2, 173], 90: [2, 173], 92: [2, 173], 101: [2, 173], 103: [2, 173], 104: [2, 173], 105: [2, 173], 109: [2, 173], 117: [2, 173], 125: [2, 173], 127: [2, 173], 128: [2, 173], 131: [2, 173], 132: [2, 173], 133: [2, 173], 134: [2, 173], 135: [2, 173], 136: [2, 173]},
                    {26: [2, 177], 120: [2, 177], 122: [2, 177]},
                    {25: [2, 131], 54: [2, 131], 102: 87, 103: [1, 65], 105: [1, 66], 108: 88, 109: [1, 68], 110: 69, 125: [1, 86], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [1, 266], 25: [1, 267], 26: [1, 321]},
                    {8: 322, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {8: 323, 9: 117, 10: 20, 11: 21, 12: [1, 22], 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 22: 17, 23: 18, 24: 19, 27: 62, 28: [1, 73], 29: 49, 30: [1, 71], 31: [1, 72], 32: 24, 33: [1, 50], 34: [1, 51], 35: [1, 52], 36: [1, 53], 37: [1, 54], 38: [1, 55], 39: 23, 44: 63, 45: [1, 45], 46: [1, 46], 47: [1, 29], 50: 30, 51: [1, 60], 52: [1, 61], 58: 47, 59: 48, 61: 36, 63: 25, 64: 26, 65: 27, 75: [1, 70], 78: [1, 43], 82: [1, 28], 87: [1, 58], 88: [1, 59], 89: [1, 57], 95: [1, 38], 99: [1, 44], 100: [1, 56], 102: 39, 103: [1, 65], 105: [1, 66], 106: 40, 107: [1, 67], 108: 41, 109: [1, 68], 110: 69, 118: [1, 42], 123: 37, 124: [1, 64], 126: [1, 31], 127: [1, 32], 128: [1, 33], 129: [1, 34], 130: [1, 35]},
                    {6: [1, 277], 25: [1, 278], 26: [1, 324]},
                    {6: [2, 41], 25: [2, 41], 26: [2, 41], 54: [2, 41], 77: [2, 41]},
                    {6: [2, 59], 25: [2, 59], 26: [2, 59], 49: [2, 59], 54: [2, 59]},
                    {1: [2, 171], 6: [2, 171], 25: [2, 171], 26: [2, 171], 49: [2, 171], 54: [2, 171], 57: [2, 171], 72: [2, 171], 77: [2, 171], 85: [2, 171], 90: [2, 171], 92: [2, 171], 101: [2, 171], 103: [2, 171], 104: [2, 171], 105: [2, 171], 109: [2, 171], 117: [2, 171], 125: [2, 171], 127: [2, 171], 128: [2, 171], 131: [2, 171], 132: [2, 171], 133: [2, 171], 134: [2, 171], 135: [2, 171], 136: [2, 171]},
                    {6: [2, 127], 25: [2, 127], 26: [2, 127], 54: [2, 127], 85: [2, 127], 90: [2, 127]},
                    {1: [2, 168], 6: [2, 168], 25: [2, 168], 26: [2, 168], 49: [2, 168], 54: [2, 168], 57: [2, 168], 72: [2, 168], 77: [2, 168], 85: [2, 168], 90: [2, 168], 92: [2, 168], 101: [2, 168], 102: 87, 103: [2, 168], 104: [2, 168], 105: [2, 168], 108: 88, 109: [2, 168], 110: 69, 117: [2, 168], 125: [2, 168], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {1: [2, 169], 6: [2, 169], 25: [2, 169], 26: [2, 169], 49: [2, 169], 54: [2, 169], 57: [2, 169], 72: [2, 169], 77: [2, 169], 85: [2, 169], 90: [2, 169], 92: [2, 169], 101: [2, 169], 102: 87, 103: [2, 169], 104: [2, 169], 105: [2, 169], 108: 88, 109: [2, 169], 110: 69, 117: [2, 169], 125: [2, 169], 127: [1, 80], 128: [1, 79], 131: [1, 78], 132: [1, 81], 133: [1, 82], 134: [1, 83], 135: [1, 84], 136: [1, 85]},
                    {6: [2, 94], 25: [2, 94], 26: [2, 94], 54: [2, 94], 77: [2, 94]}
                ], defaultActions: {60: [2, 51], 61: [2, 52], 75: [2, 3], 94: [2, 108], 189: [2, 88]}, parseError: function (b, c) {
                    throw new Error(b)
                }, parse: function (b) {
                    function o(a) {
                        d.length = d.length - 2 * a, e.length = e.length - a, f.length = f.length - a
                    }

                    function p() {
                        var a;
                        return a = c.lexer.lex() || 1, typeof a != "number" && (a = c.symbols_[a] || a), a
                    }

                    var c = this, d = [0], e = [null], f = [], g = this.table, h = "", i = 0, j = 0, k = 0, l = 2, m = 1;
                    this.lexer.setInput(b), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
                    var n = this.lexer.yylloc;
                    f.push(n), typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
                    var q, r, s, t, u, v, w = {}, x, y, z, A;
                    for (; ;) {
                        s = d[d.length - 1], this.defaultActions[s] ? t = this.defaultActions[s] : (q == null && (q = p()), t = g[s] && g[s][q]);
                        if (typeof t == "undefined" || !t.length || !t[0]) {
                            if (!k) {
                                A = [];
                                for (x in g[s])this.terminals_[x] && x > 2 && A.push("'" + this.terminals_[x] + "'");
                                var B = "";
                                this.lexer.showPosition ? B = "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + A.join(", ") + ", got '" + this.terminals_[q] + "'" : B = "Parse error on line " + (i + 1) + ": Unexpected " + (q == 1 ? "end of input" : "'" + (this.terminals_[q] || q) + "'"), this.parseError(B, {text: this.lexer.match, token: this.terminals_[q] || q, line: this.lexer.yylineno, loc: n, expected: A})
                            }
                            if (k == 3) {
                                if (q == m)throw new Error(B || "Parsing halted.");
                                j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, q = p()
                            }
                            for (; ;) {
                                if (l.toString()in g[s])break;
                                if (s == 0)throw new Error(B || "Parsing halted.");
                                o(1), s = d[d.length - 1]
                            }
                            r = q, q = l, s = d[d.length - 1], t = g[s] && g[s][l], k = 3
                        }
                        if (t[0]instanceof Array && t.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + s + ", token: " + q);
                        switch (t[0]) {
                            case 1:
                                d.push(q), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(t[1]), q = null, r ? (q = r, r = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, k > 0 && k--);
                                break;
                            case 2:
                                y = this.productions_[t[1]][1], w.$ = e[e.length - y], w._$ = {first_line: f[f.length - (y || 1)].first_line, last_line: f[f.length - 1].last_line, first_column: f[f.length - (y || 1)].first_column, last_column: f[f.length - 1].last_column}, v = this.performAction.call(w, h, j, i, this.yy, t[1], e, f);
                                if (typeof v != "undefined")return v;
                                y && (d = d.slice(0, -1 * y * 2), e = e.slice(0, -1 * y), f = f.slice(0, -1 * y)), d.push(this.productions_[t[1]][0]), e.push(w.$), f.push(w._$), z = g[d[d.length - 2]][d[d.length - 1]], d.push(z);
                                break;
                            case 3:
                                return!0
                        }
                    }
                    return!0
                }};
                return undefined, a
            }();
            typeof require != "undefined" && typeof a != "undefined" && (a.parser = b, a.parse = function () {
                return b.parse.apply(b, arguments)
            }, a.main = function (c) {
                if (!c[1])throw new Error("Usage: " + c[0] + " FILE");
                if (typeof process != "undefined")var d = require("fs").readFileSync(require("path").join(process.cwd(), c[1]), "utf8"); else var e = require("file").path(require("file").cwd()), d = e.join(c[1]).read({charset: "utf-8"});
                return a.parser.parse(d)
            }, typeof module != "undefined" && require.main === module && a.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args))
        }, require["./scope"] = new function () {
            var a = this;
            ((function () {
                var b, c, d, e;
                e = require("./helpers"), c = e.extend, d = e.last, a.Scope = b = function () {
                    function a(b, c, d) {
                        this.parent = b, this.expressions = c, this.method = d, this.variables = [
                            {name: "arguments", type: "arguments"}
                        ], this.positions = {}, this.parent || (a.root = this)
                    }

                    return a.root = null, a.prototype.add = function (a, b, c) {
                        return this.shared && !c ? this.parent.add(a, b, c) : Object.prototype.hasOwnProperty.call(this.positions, a) ? this.variables[this.positions[a]].type = b : this.positions[a] = this.variables.push({name: a, type: b}) - 1
                    }, a.prototype.namedMethod = function () {
                        return this.method.name || !this.parent ? this.method : this.parent.namedMethod()
                    }, a.prototype.find = function (a) {
                        return this.check(a) ? !0 : (this.add(a, "var"), !1)
                    }, a.prototype.parameter = function (a) {
                        if (this.shared && this.parent.check(a, !0))return;
                        return this.add(a, "param")
                    }, a.prototype.check = function (a) {
                        var b;
                        return!!(this.type(a) || ((b = this.parent) != null ? b.check(a) : void 0))
                    }, a.prototype.temporary = function (a, b) {
                        return a.length > 1 ? "_" + a + (b > 1 ? b - 1 : "") : "_" + (b + parseInt(a, 36)).toString(36).replace(/\d/g, "a")
                    }, a.prototype.type = function (a) {
                        var b, c, d, e;
                        e = this.variables;
                        for (c = 0, d = e.length; c < d; c++) {
                            b = e[c];
                            if (b.name === a)return b.type
                        }
                        return null
                    }, a.prototype.freeVariable = function (a, b) {
                        var c, d;
                        b == null && (b = !0), c = 0;
                        while (this.check(d = this.temporary(a, c)))c++;
                        return b && this.add(d, "var", !0), d
                    }, a.prototype.assign = function (a, b) {
                        return this.add(a, {value: b, assigned: !0}, !0), this.hasAssignments = !0
                    }, a.prototype.hasDeclarations = function () {
                        return!!this.declaredVariables().length
                    }, a.prototype.declaredVariables = function () {
                        var a, b, c, d, e, f;
                        a = [], b = [], f = this.variables;
                        for (d = 0, e = f.length; d < e; d++)c = f[d], c.type === "var" && (c.name.charAt(0) === "_" ? b : a).push(c.name);
                        return a.sort().concat(b.sort())
                    }, a.prototype.assignedVariables = function () {
                        var a, b, c, d, e;
                        d = this.variables, e = [];
                        for (b = 0, c = d.length; b < c; b++)a = d[b], a.type.assigned && e.push("" + a.name + " = " + a.type.value);
                        return e
                    }, a
                }()
            })).call(this)
        }, require["./nodes"] = new function () {
            var a = this;
            ((function () {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl = {}.hasOwnProperty, bm = function (a, b) {
                    function d() {
                        this.constructor = a
                    }

                    for (var c in b)bl.call(b, c) && (a[c] = b[c]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                }, bn = [].indexOf || function (a) {
                    for (var b = 0, c = this.length; b < c; b++)if (b in this && this[b] === a)return b;
                    return-1
                };
                N = require("./scope").Scope, bj = require("./lexer"), I = bj.RESERVED, M = bj.STRICT_PROSCRIBED, bk = require("./helpers"), Z = bk.compact, bb = bk.flatten, ba = bk.extend, bd = bk.merge, $ = bk.del, bg = bk.starts, _ = bk.ends, bc = bk.last, bf = bk.some, a.extend = ba, Y = function () {
                    return!0
                }, D = function () {
                    return!1
                }, S = function () {
                    return this
                }, C = function () {
                    return this.negated = !this.negated, this
                }, a.Base = e = function () {
                    function a() {
                    }

                    return a.prototype.compile = function (a, b) {
                        var c;
                        return a = ba({}, a), b && (a.level = b), c = this.unfoldSoak(a) || this, c.tab = a.indent, a.level === z || !c.isStatement(a) ? c.compileNode(a) : c.compileClosure(a)
                    }, a.prototype.compileClosure = function (a) {
                        if (this.jumps())throw SyntaxError("cannot use a pure statement in an expression.");
                        return a.sharedScope = !0, i.wrap(this).compileNode(a)
                    }, a.prototype.cache = function (a, b, c) {
                        var e, f;
                        return this.isComplex() ? (e = new A(c || a.scope.freeVariable("ref")), f = new d(e, this), b ? [f.compile(a, b), e.value] : [f, e]) : (e = b ? this.compile(a, b) : this, [e, e])
                    }, a.prototype.compileLoopReference = function (a, b) {
                        var c, d;
                        return c = d = this.compile(a, w), -Infinity < +c && +c < Infinity || o.test(c) && a.scope.check(c, !0) || (c = "" + (d = a.scope.freeVariable(b)) + " = " + c), [c, d]
                    }, a.prototype.makeReturn = function (a) {
                        var b;
                        return b = this.unwrapAll(), a ? new g(new A("" + a + ".push"), [b]) : new K(b)
                    }, a.prototype.contains = function (a) {
                        var b;
                        return b = !1, this.traverseChildren(!1, function (c) {
                            if (a(c))return b = !0, !1
                        }), b
                    }, a.prototype.containsType = function (a) {
                        return this instanceof a || this.contains(function (b) {
                            return b instanceof a
                        })
                    }, a.prototype.lastNonComment = function (a) {
                        var b;
                        b = a.length;
                        while (b--)if (!(a[b]instanceof k))return a[b];
                        return null
                    }, a.prototype.toString = function (a, b) {
                        var c;
                        return a == null && (a = ""), b == null && (b = this.constructor.name), c = "\n" + a + b, this.soak && (c += "?"), this.eachChild(function (b) {
                            return c += b.toString(a + R)
                        }), c
                    }, a.prototype.eachChild = function (a) {
                        var b, c, d, e, f, g, h, i;
                        if (!this.children)return this;
                        h = this.children;
                        for (d = 0, f = h.length; d < f; d++) {
                            b = h[d];
                            if (this[b]) {
                                i = bb([this[b]]);
                                for (e = 0, g = i.length; e < g; e++) {
                                    c = i[e];
                                    if (a(c) === !1)return this
                                }
                            }
                        }
                        return this
                    }, a.prototype.traverseChildren = function (a, b) {
                        return this.eachChild(function (c) {
                            return b(c) === !1 ? !1 : c.traverseChildren(a, b)
                        })
                    }, a.prototype.invert = function () {
                        return new F("!", this)
                    }, a.prototype.unwrapAll = function () {
                        var a;
                        a = this;
                        while (a !== (a = a.unwrap()))continue;
                        return a
                    }, a.prototype.children = [], a.prototype.isStatement = D, a.prototype.jumps = D, a.prototype.isComplex = Y, a.prototype.isChainable = D, a.prototype.isAssignable = D, a.prototype.unwrap = S, a.prototype.unfoldSoak = D, a.prototype.assigns = D, a
                }(), a.Block = f = function (a) {
                    function b(a) {
                        this.expressions = Z(bb(a || []))
                    }

                    return bm(b, a), b.prototype.children = ["expressions"], b.prototype.push = function (a) {
                        return this.expressions.push(a), this
                    }, b.prototype.pop = function () {
                        return this.expressions.pop()
                    }, b.prototype.unshift = function (a) {
                        return this.expressions.unshift(a), this
                    }, b.prototype.unwrap = function () {
                        return this.expressions.length === 1 ? this.expressions[0] : this
                    }, b.prototype.isEmpty = function () {
                        return!this.expressions.length
                    }, b.prototype.isStatement = function (a) {
                        var b, c, d, e;
                        e = this.expressions;
                        for (c = 0, d = e.length; c < d; c++) {
                            b = e[c];
                            if (b.isStatement(a))return!0
                        }
                        return!1
                    }, b.prototype.jumps = function (a) {
                        var b, c, d, e;
                        e = this.expressions;
                        for (c = 0, d = e.length; c < d; c++) {
                            b = e[c];
                            if (b.jumps(a))return b
                        }
                    }, b.prototype.makeReturn = function (a) {
                        var b, c;
                        c = this.expressions.length;
                        while (c--) {
                            b = this.expressions[c];
                            if (!(b instanceof k)) {
                                this.expressions[c] = b.makeReturn(a), b instanceof K && !b.expression && this.expressions.splice(c, 1);
                                break
                            }
                        }
                        return this
                    }, b.prototype.compile = function (a, c) {
                        return a == null && (a = {}), a.scope ? b.__super__.compile.call(this, a, c) : this.compileRoot(a)
                    }, b.prototype.compileNode = function (a) {
                        var c, d, e, f, g, h, i;
                        this.tab = a.indent, f = a.level === z, d = [], i = this.expressions;
                        for (g = 0, h = i.length; g < h; g++)e = i[g], e = e.unwrapAll(), e = e.unfoldSoak(a) || e, e instanceof b ? d.push(e.compileNode(a)) : f ? (e.front = !0, c = e.compile(a), e.isStatement(a) || (c = "" + this.tab + c + ";", e instanceof A && (c = "" + c + "\n")), d.push(c)) : d.push(e.compile(a, w));
                        return f ? this.spaced ? "\n" + d.join("\n\n") + "\n" : d.join("\n") : (c = d.join(", ") || "void 0", d.length > 1 && a.level >= w ? "(" + c + ")" : c)
                    }, b.prototype.compileRoot = function (a) {
                        var b, c, d, e, f, g;
                        return a.indent = a.bare ? "" : R, a.scope = new N(null, this, null), a.level = z, this.spaced = !0, e = "", a.bare || (f = function () {
                            var a, b, e, f;
                            e = this.expressions, f = [];
                            for (d = a = 0, b = e.length; a < b; d = ++a) {
                                c = e[d];
                                if (c.unwrap()instanceof k)f.push(c); else break
                            }
                            return f
                        }.call(this), g = this.expressions.slice(f.length), this.expressions = f, f.length && (e = "" + this.compileNode(bd(a, {indent: ""})) + "\n"), this.expressions = g), b = this.compileWithDeclarations(a), a.bare ? b : "" + e + "(function() {\n" + b + "\n}).call(this);\n"
                    }, b.prototype.compileWithDeclarations = function (a) {
                        var b, c, d, e, f, g, h, i, j, l, m, n, o, p;
                        c = g = "", n = this.expressions;
                        for (f = l = 0, m = n.length; l < m; f = ++l) {
                            e = n[f], e = e.unwrap();
                            if (!(e instanceof k || e instanceof A))break
                        }
                        a = bd(a, {level: z}), f && (h = this.expressions.splice(f, 9e9), o = [this.spaced, !1], j = o[0], this.spaced = o[1], p = [this.compileNode(a), j], c = p[0], this.spaced = p[1], this.expressions = h), g = this.compileNode(a), i = a.scope;
                        if (i.expressions === this) {
                            d = a.scope.hasDeclarations(), b = i.hasAssignments;
                            if (d || b)f && (c += "\n"), c += "" + this.tab + "var ", d && (c += i.declaredVariables().join(", ")), b && (d && (c += ",\n" + (this.tab + R)), c += i.assignedVariables().join(",\n" + (this.tab + R))), c += ";\n"
                        }
                        return c + g
                    }, b.wrap = function (a) {
                        return a.length === 1 && a[0]instanceof b ? a[0] : new b(a)
                    }, b
                }(e), a.Literal = A = function (a) {
                    function b(a) {
                        this.value = a
                    }

                    return bm(b, a), b.prototype.makeReturn = function () {
                        return this.isStatement() ? this : b.__super__.makeReturn.apply(this, arguments)
                    }, b.prototype.isAssignable = function () {
                        return o.test(this.value)
                    }, b.prototype.isStatement = function () {
                        var a;
                        return(a = this.value) === "break" || a === "continue" || a === "debugger"
                    }, b.prototype.isComplex = D, b.prototype.assigns = function (a) {
                        return a === this.value
                    }, b.prototype.jumps = function (a) {
                        if (this.value === "break" && !((a != null ? a.loop : void 0) || (a != null ? a.block : void 0)))return this;
                        if (this.value === "continue" && (a != null ? !a.loop : !void 0))return this
                    }, b.prototype.compileNode = function (a) {
                        var b, c;
                        return b = this.value === "this" ? ((c = a.scope.method) != null ? c.bound : void 0) ? a.scope.method.context : this.value : this.value.reserved ? '"' + this.value + '"' : this.value, this.isStatement() ? "" + this.tab + b + ";" : b
                    }, b.prototype.toString = function () {
                        return' "' + this.value + '"'
                    }, b
                }(e), a.Undefined = function (a) {
                    function b() {
                        return b.__super__.constructor.apply(this, arguments)
                    }

                    return bm(b, a), b.prototype.isAssignable = D, b.prototype.isComplex = D, b.prototype.compileNode = function (a) {
                        return a.level >= u ? "(void 0)" : "void 0"
                    }, b
                }(e), a.Null = function (a) {
                    function b() {
                        return b.__super__.constructor.apply(this, arguments)
                    }

                    return bm(b, a), b.prototype.isAssignable = D, b.prototype.isComplex = D, b.prototype.compileNode = function () {
                        return"null"
                    }, b
                }(e), a.Bool = function (a) {
                    function b(a) {
                        this.val = a
                    }

                    return bm(b, a), b.prototype.isAssignable = D, b.prototype.isComplex = D, b.prototype.compileNode = function () {
                        return this.val
                    }, b
                }(e), a.Return = K = function (a) {
                    function b(a) {
                        a && !a.unwrap().isUndefined && (this.expression = a)
                    }

                    return bm(b, a), b.prototype.children = ["expression"], b.prototype.isStatement = Y, b.prototype.makeReturn = S, b.prototype.jumps = S, b.prototype.compile = function (a, c) {
                        var d, e;
                        return d = (e = this.expression) != null ? e.makeReturn() : void 0, !d || d instanceof b ? b.__super__.compile.call(this, a, c) : d.compile(a, c)
                    }, b.prototype.compileNode = function (a) {
                        return this.tab + ("return" + [this.expression ? " " + this.expression.compile(a, y) : void 0] + ";")
                    }, b
                }(e), a.Value = W = function (a) {
                    function b(a, c, d) {
                        return!c && a instanceof b ? a : (this.base = a, this.properties = c || [], d && (this[d] = !0), this)
                    }

                    return bm(b, a), b.prototype.children = ["base", "properties"], b.prototype.add = function (a) {
                        return this.properties = this.properties.concat(a), this
                    }, b.prototype.hasProperties = function () {
                        return!!this.properties.length
                    }, b.prototype.isArray = function () {
                        return!this.properties.length && this.base instanceof c
                    }, b.prototype.isComplex = function () {
                        return this.hasProperties() || this.base.isComplex()
                    }, b.prototype.isAssignable = function () {
                        return this.hasProperties() || this.base.isAssignable()
                    }, b.prototype.isSimpleNumber = function () {
                        return this.base instanceof A && L.test(this.base.value)
                    }, b.prototype.isString = function () {
                        return this.base instanceof A && q.test(this.base.value)
                    }, b.prototype.isAtomic = function () {
                        var a, b, c, d;
                        d = this.properties.concat(this.base);
                        for (b = 0, c = d.length; b < c; b++) {
                            a = d[b];
                            if (a.soak || a instanceof g)return!1
                        }
                        return!0
                    }, b.prototype.isStatement = function (a) {
                        return!this.properties.length && this.base.isStatement(a)
                    }, b.prototype.assigns = function (a) {
                        return!this.properties.length && this.base.assigns(a)
                    }, b.prototype.jumps = function (a) {
                        return!this.properties.length && this.base.jumps(a)
                    }, b.prototype.isObject = function (a) {
                        return this.properties.length ? !1 : this.base instanceof E && (!a || this.base.generated)
                    }, b.prototype.isSplice = function () {
                        return bc(this.properties)instanceof O
                    }, b.prototype.unwrap = function () {
                        return this.properties.length ? this : this.base
                    }, b.prototype.cacheReference = function (a) {
                        var c, e, f, g;
                        return f = bc(this.properties), this.properties.length < 2 && !this.base.isComplex() && (f != null ? !f.isComplex() : !void 0) ? [this, this] : (c = new b(this.base, this.properties.slice(0, -1)), c.isComplex() && (e = new A(a.scope.freeVariable("base")), c = new b(new H(new d(e, c)))), f ? (f.isComplex() && (g = new A(a.scope.freeVariable("name")), f = new t(new d(g, f.index)), g = new t(g)), [c.add(f), new b(e || c.base, [g || f])]) : [c, e])
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d, e, f;
                        this.base.front = this.front, d = this.properties, b = this.base.compile(a, d.length ? u : null), (this.base instanceof H || d.length) && L.test(b) && (b = "" + b + ".");
                        for (e = 0, f = d.length; e < f; e++)c = d[e], b += c.compile(a);
                        return b
                    }, b.prototype.unfoldSoak = function (a) {
                        var c, e = this;
                        return this.unfoldedSoak != null ? this.unfoldedSoak : (c = function () {
                            var c, f, g, h, i, j, k, m, n;
                            if (g = e.base.unfoldSoak(a))return Array.prototype.push.apply(g.body.properties, e.properties), g;
                            n = e.properties;
                            for (f = k = 0, m = n.length; k < m; f = ++k) {
                                h = n[f];
                                if (!h.soak)continue;
                                return h.soak = !1, c = new b(e.base, e.properties.slice(0, f)), j = new b(e.base, e.properties.slice(f)), c.isComplex() && (i = new A(a.scope.freeVariable("ref")), c = new H(new d(i, c)), j.base = i), new r(new l(c), j, {soak: !0})
                            }
                            return null
                        }(), this.unfoldedSoak = c || !1)
                    }, b
                }(e), a.Comment = k = function (a) {
                    function b(a) {
                        this.comment = a
                    }

                    return bm(b, a), b.prototype.isStatement = Y, b.prototype.makeReturn = S, b.prototype.compileNode = function (a, b) {
                        var c;
                        return c = "/*" + be(this.comment, this.tab) + ("\n" + this.tab + "*/\n"), (b || a.level) === z && (c = a.indent + c), c
                    }, b
                }(e), a.Call = g = function (a) {
                    function c(a, b, c) {
                        this.args = b != null ? b : [], this.soak = c, this.isNew = !1, this.isSuper = a === "super", this.variable = this.isSuper ? null : a
                    }

                    return bm(c, a), c.prototype.children = ["variable", "args"], c.prototype.newInstance = function () {
                        var a, b;
                        return a = ((b = this.variable) != null ? b.base : void 0) || this.variable, a instanceof c && !a.isNew ? a.newInstance() : this.isNew = !0, this
                    }, c.prototype.superReference = function (a) {
                        var c, d, e;
                        d = a.scope.namedMethod();
                        if (!d)throw SyntaxError("cannot call super outside of a function.");
                        e = d.name;
                        if (e == null)throw SyntaxError("cannot call super on an anonymous function.");
                        return d.klass ? (c = [new b(new A("__super__"))], d["static"] && c.push(new b(new A("constructor"))), c.push(new b(new A(e))), (new W(new A(d.klass), c)).compile(a)) : "" + e + ".__super__.constructor"
                    }, c.prototype.superThis = function (a) {
                        var b;
                        return b = a.scope.method, b && !b.klass && b.context || "this"
                    }, c.prototype.unfoldSoak = function (a) {
                        var b, d, e, f, g, h, i, j, k;
                        if (this.soak) {
                            if (this.variable) {
                                if (d = bh(a, this, "variable"))return d;
                                j = (new W(this.variable)).cacheReference(a), e = j[0], g = j[1]
                            } else e = new A(this.superReference(a)), g = new W(e);
                            return g = new c(g, this.args), g.isNew = this.isNew, e = new A("typeof " + e.compile(a) + ' === "function"'), new r(e, new W(g), {soak: !0})
                        }
                        b = this, f = [];
                        for (; ;) {
                            if (b.variable instanceof c) {
                                f.push(b), b = b.variable;
                                continue
                            }
                            if (!(b.variable instanceof W))break;
                            f.push(b);
                            if (!((b = b.variable.base)instanceof c))break
                        }
                        k = f.reverse();
                        for (h = 0, i = k.length; h < i; h++)b = k[h], d && (b.variable instanceof c ? b.variable = d : b.variable.base = d), d = bh(a, b, "variable");
                        return d
                    }, c.prototype.filterImplicitObjects = function (a) {
                        var b, c, e, f, g, h, i, j, l, m;
                        c = [];
                        for (h = 0, j = a.length; h < j; h++) {
                            b = a[h];
                            if (!((typeof b.isObject == "function" ? b.isObject() : void 0) && b.base.generated)) {
                                c.push(b);
                                continue
                            }
                            e = null, m = b.base.properties;
                            for (i = 0, l = m.length; i < l; i++)f = m[i], f instanceof d || f instanceof k ? (e || c.push(e = new E(g = [], !0)), g.push(f)) : (c.push(f), e = null)
                        }
                        return c
                    }, c.prototype.compileNode = function (a) {
                        var b, c, d, e;
                        return(e = this.variable) != null && (e.front = this.front), (d = P.compileSplattedArray(a, this.args, !0)) ? this.compileSplat(a, d) : (c = this.filterImplicitObjects(this.args), c = function () {
                            var d, e, f;
                            f = [];
                            for (d = 0, e = c.length; d < e; d++)b = c[d], f.push(b.compile(a, w));
                            return f
                        }().join(", "), this.isSuper ? this.superReference(a) + (".call(" + this.superThis(a) + (c && ", " + c) + ")") : (this.isNew ? "new " : "") + this.variable.compile(a, u) + ("(" + c + ")"))
                    }, c.prototype.compileSuper = function (a, b) {
                        return"" + this.superReference(b) + ".call(" + this.superThis(b) + (a.length ? ", " : "") + a + ")"
                    }, c.prototype.compileSplat = function (a, b) {
                        var c, d, e, f, g;
                        return this.isSuper ? "" + this.superReference(a) + ".apply(" + this.superThis(a) + ", " + b + ")" : this.isNew ? (e = this.tab + R, "(function(func, args, ctor) {\n" + e + "ctor.prototype = func.prototype;\n" + e + "var child = new ctor, result = func.apply(child, args);\n" + e + "return Object(result) === result ? result : child;\n" + this.tab + "})(" + this.variable.compile(a, w) + ", " + b + ", function(){})") : (c = new W(this.variable), (f = c.properties.pop()) && c.isComplex() ? (g = a.scope.freeVariable("ref"), d = "(" + g + " = " + c.compile(a, w) + ")" + f.compile(a)) : (d = c.compile(a, u), L.test(d) && (d = "(" + d + ")"), f ? (g = d, d += f.compile(a)) : g = "null"), "" + d + ".apply(" + g + ", " + b + ")")
                    }, c
                }(e), a.Extends = m = function (a) {
                    function b(a, b) {
                        this.child = a, this.parent = b
                    }

                    return bm(b, a), b.prototype.children = ["child", "parent"], b.prototype.compile = function (a) {
                        return(new g(new W(new A(bi("extends"))), [this.child, this.parent])).compile(a)
                    }, b
                }(e), a.Access = b = function (a) {
                    function b(a, b) {
                        this.name = a, this.name.asKey = !0, this.soak = b === "soak"
                    }

                    return bm(b, a), b.prototype.children = ["name"], b.prototype.compile = function (a) {
                        var b;
                        return b = this.name.compile(a), o.test(b) ? "." + b : "[" + b + "]"
                    }, b.prototype.isComplex = D, b
                }(e), a.Index = t = function (a) {
                    function b(a) {
                        this.index = a
                    }

                    return bm(b, a), b.prototype.children = ["index"], b.prototype.compile = function (a) {
                        return"[" + this.index.compile(a, y) + "]"
                    }, b.prototype.isComplex = function () {
                        return this.index.isComplex()
                    }, b
                }(e), a.Range = J = function (a) {
                    function b(a, b, c) {
                        this.from = a, this.to = b, this.exclusive = c === "exclusive", this.equals = this.exclusive ? "" : "="
                    }

                    return bm(b, a), b.prototype.children = ["from", "to"], b.prototype.compileVariables = function (a) {
                        var b, c, d, e, f;
                        a = bd(a, {top: !0}), c = this.from.cache(a, w), this.fromC = c[0], this.fromVar = c[1], d = this.to.cache(a, w), this.toC = d[0], this.toVar = d[1];
                        if (b = $(a, "step"))e = b.cache(a, w), this.step = e[0], this.stepVar = e[1];
                        f = [this.fromVar.match(L), this.toVar.match(L)], this.fromNum = f[0], this.toNum = f[1];
                        if (this.stepVar)return this.stepNum = this.stepVar.match(L)
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
                        return this.fromVar || this.compileVariables(a), a.index ? (h = this.fromNum && this.toNum, f = $(a, "index"), g = $(a, "name"), j = g && g !== f, m = "" + f + " = " + this.fromC, this.toC !== this.toVar && (m += ", " + this.toC), this.step !== this.stepVar && (m += ", " + this.step), n = ["" + f + " <" + this.equals, "" + f + " >" + this.equals], i = n[0], e = n[1], c = this.stepNum ? +this.stepNum > 0 ? "" + i + " " + this.toVar : "" + e + " " + this.toVar : h ? (o = [+this.fromNum, +this.toNum], d = o[0], l = o[1], o, d <= l ? "" + i + " " + l : "" + e + " " + l) : (b = "" + this.fromVar + " <= " + this.toVar, "" + b + " ? " + i + " " + this.toVar + " : " + e + " " + this.toVar), k = this.stepVar ? "" + f + " += " + this.stepVar : h ? j ? d <= l ? "++" + f : "--" + f : d <= l ? "" + f + "++" : "" + f + "--" : j ? "" + b + " ? ++" + f + " : --" + f : "" + b + " ? " + f + "++ : " + f + "--", j && (m = "" + g + " = " + m), j && (k = "" + g + " = " + k), "" + m + "; " + c + "; " + k) : this.compileArray(a)
                    }, b.prototype.compileArray = function (a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                        if (this.fromNum && this.toNum && Math.abs(this.fromNum - this.toNum) <= 20)return j = function () {
                            p = [];
                            for (var a = n = +this.fromNum, b = +this.toNum; n <= b ? a <= b : a >= b; n <= b ? a++ : a--)p.push(a);
                            return p
                        }.apply(this), this.exclusive && j.pop(), "[" + j.join(", ") + "]";
                        g = this.tab + R, f = a.scope.freeVariable("i"), k = a.scope.freeVariable("results"), i = "\n" + g + k + " = [];", this.fromNum && this.toNum ? (a.index = f, c = this.compileNode(a)) : (l = "" + f + " = " + this.fromC + (this.toC !== this.toVar ? ", " + this.toC : ""), d = "" + this.fromVar + " <= " + this.toVar, c = "var " + l + "; " + d + " ? " + f + " <" + this.equals + " " + this.toVar + " : " + f + " >" + this.equals + " " + this.toVar + "; " + d + " ? " + f + "++ : " + f + "--"), h = "{ " + k + ".push(" + f + "); }\n" + g + "return " + k + ";\n" + a.indent, e = function (a) {
                            return a != null ? a.contains(function (a) {
                                return a instanceof A && a.value === "arguments" && !a.asKey
                            }) : void 0
                        };
                        if (e(this.from) || e(this.to))b = ", arguments";
                        return"(function() {" + i + "\n" + g + "for (" + c + ")" + h + "}).apply(this" + (b != null ? b : "") + ")"
                    }, b
                }(e), a.Slice = O = function (a) {
                    function b(a) {
                        this.range = a, b.__super__.constructor.call(this)
                    }

                    return bm(b, a), b.prototype.children = ["range"], b.prototype.compileNode = function (a) {
                        var b, c, d, e, f, g;
                        return g = this.range, e = g.to, c = g.from, d = c && c.compile(a, y) || "0", b = e && e.compile(a, y), e && (!!this.range.exclusive || +b !== -1) && (f = ", " + (this.range.exclusive ? b : L.test(b) ? "" + (+b + 1) : (b = e.compile(a, u), "+" + b + " + 1 || 9e9"))), ".slice(" + d + (f || "") + ")"
                    }, b
                }(e), a.Obj = E = function (a) {
                    function b(a, b) {
                        this.generated = b != null ? b : !1, this.objects = this.properties = a || []
                    }

                    return bm(b, a), b.prototype.children = ["properties"], b.prototype.compileNode = function (a) {
                        var b, c, e, f, g, h, i, j, l, m, n;
                        l = this.properties;
                        if (!l.length)return this.front ? "({})" : "{}";
                        if (this.generated)for (m = 0, n = l.length; m < n; m++) {
                            h = l[m];
                            if (h instanceof W)throw new Error("cannot have an implicit value in an implicit object")
                        }
                        return c = a.indent += R, g = this.lastNonComment(this.properties), l = function () {
                            var h, i, m;
                            m = [];
                            for (b = h = 0, i = l.length; h < i; b = ++h)j = l[b], f = b === l.length - 1 ? "" : j === g || j instanceof k ? "\n" : ",\n", e = j instanceof k ? "" : c, j instanceof W && j["this"] && (j = new d(j.properties[0].name, j, "object")), j instanceof k || (j instanceof d || (j = new d(j, j, "object")), (j.variable.base || j.variable).asKey = !0), m.push(e + j.compile(a, z) + f);
                            return m
                        }(), l = l.join(""), i = "{" + (l && "\n" + l + "\n" + this.tab) + "}", this.front ? "(" + i + ")" : i
                    }, b.prototype.assigns = function (a) {
                        var b, c, d, e;
                        e = this.properties;
                        for (c = 0, d = e.length; c < d; c++) {
                            b = e[c];
                            if (b.assigns(a))return!0
                        }
                        return!1
                    }, b
                }(e), a.Arr = c = function (a) {
                    function b(a) {
                        this.objects = a || []
                    }

                    return bm(b, a), b.prototype.children = ["objects"], b.prototype.filterImplicitObjects = g.prototype.filterImplicitObjects, b.prototype.compileNode = function (a) {
                        var b, c, d;
                        return this.objects.length ? (a.indent += R, d = this.filterImplicitObjects(this.objects), (b = P.compileSplattedArray(a, d)) ? b : (b = function () {
                            var b, e, f;
                            f = [];
                            for (b = 0, e = d.length; b < e; b++)c = d[b], f.push(c.compile(a, w));
                            return f
                        }().join(", "), b.indexOf("\n") >= 0 ? "[\n" + a.indent + b + "\n" + this.tab + "]" : "[" + b + "]")) : "[]"
                    }, b.prototype.assigns = function (a) {
                        var b, c, d, e;
                        e = this.objects;
                        for (c = 0, d = e.length; c < d; c++) {
                            b = e[c];
                            if (b.assigns(a))return!0
                        }
                        return!1
                    }, b
                }(e), a.Class = h = function (a) {
                    function c(a, b, c) {
                        this.variable = a, this.parent = b, this.body = c != null ? c : new f, this.boundFuncs = [], this.body.classBody = !0
                    }

                    return bm(c, a), c.prototype.children = ["variable", "parent", "body"], c.prototype.determineName = function () {
                        var a, c;
                        if (!this.variable)return null;
                        a = (c = bc(this.variable.properties)) ? c instanceof b && c.name.value : this.variable.base.value;
                        if (bn.call(M, a) >= 0)throw SyntaxError("variable name may not be " + a);
                        return a && (a = o.test(a) && a)
                    }, c.prototype.setContext = function (a) {
                        return this.body.traverseChildren(!1, function (b) {
                            if (b.classBody)return!1;
                            if (b instanceof A && b.value === "this")return b.value = a;
                            if (b instanceof j) {
                                b.klass = a;
                                if (b.bound)return b.context = a
                            }
                        })
                    }, c.prototype.addBoundFunctions = function (a) {
                        var c, d, e, f, g, h;
                        if (this.boundFuncs.length) {
                            g = this.boundFuncs, h = [];
                            for (e = 0, f = g.length; e < f; e++)c = g[e], d = (new W(new A("this"), [new b(c)])).compile(a), h.push(this.ctor.body.unshift(new A("" + d + " = " + bi("bind") + "(" + d + ", this)")));
                            return h
                        }
                    }, c.prototype.addProperties = function (a, c, e) {
                        var f, g, h, i, k;
                        return k = a.base.properties.slice(0), h = function () {
                            var a;
                            a = [];
                            while (f = k.shift()) {
                                if (f instanceof d) {
                                    g = f.variable.base, delete f.context, i = f.value;
                                    if (g.value === "constructor") {
                                        if (this.ctor)throw new Error("cannot define more than one constructor in a class");
                                        if (i.bound)throw new Error("cannot define a constructor as a bound function");
                                        i instanceof j ? f = this.ctor = i : (this.externalCtor = e.scope.freeVariable("class"), f = new d(new A(this.externalCtor), i))
                                    } else f.variable["this"] ? (i["static"] = !0, i.bound && (i.context = c)) : (f.variable = new W(new A(c), [new b(new A("prototype")), new b(g)]), i instanceof j && i.bound && (this.boundFuncs.push(g), i.bound = !1))
                                }
                                a.push(f)
                            }
                            return a
                        }.call(this), Z(h)
                    }, c.prototype.walkBody = function (a, b) {
                        var d = this;
                        return this.traverseChildren(!1, function (e) {
                            var g, h, i, j, k, l;
                            if (e instanceof c)return!1;
                            if (e instanceof f) {
                                l = g = e.expressions;
                                for (h = j = 0, k = l.length; j < k; h = ++j)i = l[h], i instanceof W && i.isObject(!0) && (g[h] = d.addProperties(i, a, b));
                                return e.expressions = g = bb(g)
                            }
                        })
                    }, c.prototype.hoistDirectivePrologue = function () {
                        var a, b, c;
                        b = 0, a = this.body.expressions;
                        while ((c = a[b]) && c instanceof k || c instanceof W && c.isString())++b;
                        return this.directives = a.splice(0, b)
                    }, c.prototype.ensureConstructor = function (a) {
                        return this.ctor || (this.ctor = new j, this.parent && this.ctor.body.push(new A("" + a + ".__super__.constructor.apply(this, arguments)")), this.externalCtor && this.ctor.body.push(new A("" + this.externalCtor + ".apply(this, arguments)")), this.ctor.body.makeReturn(), this.body.expressions.unshift(this.ctor)), this.ctor.ctor = this.ctor.name = a, this.ctor.klass = null, this.ctor.noReturn = !0
                    }, c.prototype.compileNode = function (a) {
                        var b, c, e, f, g, h, k;
                        return c = this.determineName(), g = c || "_Class", g.reserved && (g = "_" + g), f = new A(g), this.hoistDirectivePrologue(), this.setContext(g), this.walkBody(g, a), this.ensureConstructor(g), this.body.spaced = !0, this.ctor instanceof j || this.body.expressions.unshift(this.ctor), this.body.expressions.push(f), (k = this.body.expressions).unshift.apply(k, this.directives), this.addBoundFunctions(a), b = i.wrap(this.body), this.parent && (this.superClass = new A(a.scope.freeVariable("super", !1)), this.body.expressions.unshift(new m(f, this.superClass)), b.args.push(this.parent), h = b.variable.params || b.variable.base.params, h.push(new G(this.superClass))), e = new H(b, !0), this.variable && (e = new d(this.variable, e)), e.compile(a)
                    }, c
                }(e), a.Assign = d = function (a) {
                    function c(a, b, c, d) {
                        var e, f, g;
                        this.variable = a, this.value = b, this.context = c, this.param = d && d.param, this.subpattern = d && d.subpattern, e = (g = f = this.variable.unwrapAll().value, bn.call(M, g) >= 0);
                        if (e && this.context !== "object")throw SyntaxError('variable name may not be "' + f + '"')
                    }

                    return bm(c, a), c.prototype.children = ["variable", "value"], c.prototype.isStatement = function (a) {
                        return(a != null ? a.level : void 0) === z && this.context != null && bn.call(this.context, "?") >= 0
                    }, c.prototype.assigns = function (a) {
                        return this[this.context === "object" ? "value" : "variable"].assigns(a)
                    }, c.prototype.unfoldSoak = function (a) {
                        return bh(a, this, "variable")
                    }, c.prototype.compileNode = function (a) {
                        var b, c, d, e, f, g, h, i, k;
                        if (b = this.variable instanceof W) {
                            if (this.variable.isArray() || this.variable.isObject())return this.compilePatternMatch(a);
                            if (this.variable.isSplice())return this.compileSplice(a);
                            if ((g = this.context) === "||=" || g === "&&=" || g === "?=")return this.compileConditional(a)
                        }
                        d = this.variable.compile(a, w);
                        if (!this.context) {
                            if (!(f = this.variable.unwrapAll()).isAssignable())throw SyntaxError('"' + this.variable.compile(a) + '" cannot be assigned.');
                            if (typeof f.hasProperties == "function" ? !f.hasProperties() : !void 0)this.param ? a.scope.add(d, "var") : a.scope.find(d)
                        }
                        return this.value instanceof j && (c = B.exec(d)) && (c[1] && (this.value.klass = c[1]), this.value.name = (h = (i = (k = c[2]) != null ? k : c[3]) != null ? i : c[4]) != null ? h : c[5]), e = this.value.compile(a, w), this.context === "object" ? "" + d + ": " + e : (e = d + (" " + (this.context || "=") + " ") + e, a.level <= w ? e : "(" + e + ")")
                    }, c.prototype.compilePatternMatch = function (a) {
                        var d, e, f, g, h, i, j, k, l, m, n, p, q, r, s, u, v, y, B, C, D, E, F, G, J, K, L;
                        s = a.level === z, v = this.value, m = this.variable.base.objects;
                        if (!(n = m.length))return f = v.compile(a), a.level >= x ? "(" + f + ")" : f;
                        i = this.variable.isObject();
                        if (s && n === 1 && !((l = m[0])instanceof P)) {
                            l instanceof c ? (D = l, E = D.variable, h = E.base, l = D.value) : l.base instanceof H ? (F = (new W(l.unwrapAll())).cacheReference(a), l = F[0], h = F[1]) : h = i ? l["this"] ? l.properties[0].name : l : new A(0), d = o.test(h.unwrap().value || 0), v = new W(v), v.properties.push(new (d ? b : t)(h));
                            if (G = l.unwrap().value, bn.call(I, G) >= 0)throw new SyntaxError("assignment to a reserved word: " + l.compile(a) + " = " + v.compile(a));
                            return(new c(l, v, null, {param: this.param})).compile(a, z)
                        }
                        y = v.compile(a, w), e = [], r = !1;
                        if (!o.test(y) || this.variable.assigns(y))e.push("" + (p = a.scope.freeVariable("ref")) + " = " + y), y = p;
                        for (g = B = 0, C = m.length; B < C; g = ++B) {
                            l = m[g], h = g, i && (l instanceof c ? (J = l, K = J.variable, h = K.base, l = J.value) : l.base instanceof H ? (L = (new W(l.unwrapAll())).cacheReference(a), l = L[0], h = L[1]) : h = l["this"] ? l.properties[0].name : l);
                            if (!r && l instanceof P)k = l.name.unwrap().value, l = l.unwrap(), u = "" + n + " <= " + y + ".length ? " + bi("slice") + ".call(" + y + ", " + g, (q = n - g - 1) ? (j = a.scope.freeVariable("i"), u += ", " + j + " = " + y + ".length - " + q + ") : (" + j + " = " + g + ", [])") : u += ") : []", u = new A(u), r = "" + j + "++"; else {
                                k = l.unwrap().value;
                                if (l instanceof P)throw l = l.name.compile(a), new SyntaxError("multiple splats are disallowed in an assignment: " + l + "...");
                                typeof h == "number" ? (h = new A(r || h), d = !1) : d = i && o.test(h.unwrap().value || 0), u = new W(new A(y), [new (d ? b : t)(h)])
                            }
                            if (k != null && bn.call(I, k) >= 0)throw new SyntaxError("assignment to a reserved word: " + l.compile(a) + " = " + u.compile(a));
                            e.push((new c(l, u, null, {param: this.param, subpattern: !0})).compile(a, w))
                        }
                        return!s && !this.subpattern && e.push(y), f = e.join(", "), a.level < w ? f : "(" + f + ")"
                    }, c.prototype.compileConditional = function (a) {
                        var b, d, e;
                        e = this.variable.cacheReference(a), b = e[0], d = e[1];
                        if (!b.properties.length && b.base instanceof A && b.base.value !== "this" && !a.scope.check(b.base.value))throw new Error('the variable "' + b.base.value + "\" can't be assigned with " + this.context + " because it has not been defined.");
                        return bn.call(this.context, "?") >= 0 && (a.isExistentialEquals = !0), (new F(this.context.slice(0, -1), b, new c(d, this.value, "="))).compile(a)
                    }, c.prototype.compileSplice = function (a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m;
                        return k = this.variable.properties.pop().range, d = k.from, h = k.to, c = k.exclusive, g = this.variable.compile(a), l = (d != null ? d.cache(a, x) : void 0) || ["0", "0"], e = l[0], f = l[1], h ? (d != null ? d.isSimpleNumber() : void 0) && h.isSimpleNumber() ? (h = +h.compile(a) - +f, c || (h += 1)) : (h = h.compile(a, u) + " - " + f, c || (h += " + 1")) : h = "9e9", m = this.value.cache(a, w), i = m[0], j = m[1], b = "[].splice.apply(" + g + ", [" + e + ", " + h + "].concat(" + i + ")), " + j, a.level > z ? "(" + b + ")" : b
                    }, c
                }(e), a.Code = j = function (a) {
                    function b(a, b, c) {
                        this.params = a || [], this.body = b || new f, this.bound = c === "boundfunc", this.bound && (this.context = "_this")
                    }

                    return bm(b, a), b.prototype.children = ["params", "body"], b.prototype.isStatement = function () {
                        return!!this.ctor
                    }, b.prototype.jumps = D, b.prototype.compileNode = function (a) {
                        var b, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, v, w, x, y, z, B, C, D, E, G, H, I, J, K, L, M, O;
                        a.scope = new N(a.scope, this.body, this), a.scope.shared = $(a, "sharedScope"), a.indent += R, delete a.bare, delete a.isExistentialEquals, l = [], e = [], H = this.paramNames();
                        for (s = 0, x = H.length; s < x; s++)i = H[s], a.scope.check(i) || a.scope.parameter(i);
                        I = this.params;
                        for (t = 0, y = I.length; t < y; t++) {
                            k = I[t];
                            if (!k.splat)continue;
                            J = this.params;
                            for (v = 0, z = J.length; v < z; v++)j = J[v].name, j["this"] && (j = j.properties[0].name), j.value && a.scope.add(j.value, "var", !0);
                            n = new d(new W(new c(function () {
                                var b, c, d, e;
                                d = this.params, e = [];
                                for (b = 0, c = d.length; b < c; b++)j = d[b], e.push(j.asReference(a));
                                return e
                            }.call(this))), new W(new A("arguments")));
                            break
                        }
                        K = this.params;
                        for (w = 0, B = K.length; w < B; w++)k = K[w], k.isComplex() ? (p = m = k.asReference(a), k.value && (p = new F("?", m, k.value)), e.push(new d(new W(k.name), p, "=", {param: !0}))) : (m = k, k.value && (h = new A(m.name.value + " == null"), p = new d(new W(k.name), k.value, "="), e.push(new r(h, p)))), n || l.push(m);
                        q = this.body.isEmpty(), n && e.unshift(n), e.length && (L = this.body.expressions).unshift.apply(L, e);
                        for (f = E = 0, C = l.length; E < C; f = ++E)j = l[f], a.scope.parameter(l[f] = j.compile(a));
                        o = [], M = this.paramNames();
                        for (G = 0, D = M.length; G < D; G++) {
                            i = M[G];
                            if (bn.call(o, i) >= 0)throw SyntaxError("multiple parameters named '" + i + "'");
                            o.push(i)
                        }
                        return!q && !this.noReturn && this.body.makeReturn(), this.bound && (((O = a.scope.parent.method) != null ? O.bound : void 0) ? this.bound = this.context = a.scope.parent.method.context : this["static"] || a.scope.parent.assign("_this", "this")), g = a.indent, b = "function", this.ctor && (b += " " + this.name), b += "(" + l.join(", ") + ") {", this.body.isEmpty() || (b += "\n" + this.body.compileWithDeclarations(a) + "\n" + this.tab), b += "}", this.ctor ? this.tab + b : this.front || a.level >= u ? "(" + b + ")" : b
                    }, b.prototype.paramNames = function () {
                        var a, b, c, d, e;
                        a = [], e = this.params;
                        for (c = 0, d = e.length; c < d; c++)b = e[c], a.push.apply(a, b.names());
                        return a
                    }, b.prototype.traverseChildren = function (a, c) {
                        if (a)return b.__super__.traverseChildren.call(this, a, c)
                    }, b
                }(e), a.Param = G = function (a) {
                    function b(a, b, c) {
                        var d;
                        this.name = a, this.value = b, this.splat = c;
                        if (d = a = this.name.unwrapAll().value, bn.call(M, d) >= 0)throw SyntaxError('parameter name "' + a + '" is not allowed')
                    }

                    return bm(b, a), b.prototype.children = ["name", "value"], b.prototype.compile = function (a) {
                        return this.name.compile(a, w)
                    }, b.prototype.asReference = function (a) {
                        var b;
                        return this.reference ? this.reference : (b = this.name, b["this"] ? (b = b.properties[0].name, b.value.reserved && (b = new A(a.scope.freeVariable(b.value)))) : b.isComplex() && (b = new A(a.scope.freeVariable("arg"))), b = new W(b), this.splat && (b = new P(b)), this.reference = b)
                    }, b.prototype.isComplex = function () {
                        return this.name.isComplex()
                    }, b.prototype.names = function (a) {
                        var b, c, e, f, g, h;
                        a == null && (a = this.name), b = function (a) {
                            var b;
                            return b = a.properties[0].name.value, b.reserved ? [] : [b]
                        };
                        if (a instanceof A)return[a.value];
                        if (a instanceof W)return b(a);
                        c = [], h = a.objects;
                        for (f = 0, g = h.length; f < g; f++) {
                            e = h[f];
                            if (e instanceof d)c.push(e.value.unwrap().value); else if (e instanceof P)c.push(e.name.unwrap().value); else if (e instanceof W)e.isArray() || e.isObject() ? c.push.apply(c, this.names(e.base)) : e["this"] ? c.push.apply(c, b(e)) : c.push(e.base.value); else throw SyntaxError("illegal parameter " + e.compile())
                        }
                        return c
                    }, b
                }(e), a.Splat = P = function (a) {
                    function b(a) {
                        this.name = a.compile ? a : new A(a)
                    }

                    return bm(b, a), b.prototype.children = ["name"], b.prototype.isAssignable = Y, b.prototype.assigns = function (a) {
                        return this.name.assigns(a)
                    }, b.prototype.compile = function (a) {
                        return this.index != null ? this.compileParam(a) : this.name.compile(a)
                    }, b.prototype.unwrap = function () {
                        return this.name
                    }, b.compileSplattedArray = function (a, c, d) {
                        var e, f, g, h, i, j, k, l;
                        i = -1;
                        while ((j = c[++i]) && !(j instanceof b))continue;
                        if (i >= c.length)return"";
                        if (c.length === 1)return g = c[0].compile(a, w), d ? g : "" + bi("slice") + ".call(" + g + ")";
                        e = c.slice(i);
                        for (h = k = 0, l = e.length; k < l; h = ++k)j = e[h], g = j.compile(a, w), e[h] = j instanceof b ? "" + bi("slice") + ".call(" + g + ")" : "[" + g + "]";
                        return i === 0 ? e[0] + (".concat(" + e.slice(1).join(", ") + ")") : (f = function () {
                            var b, d, e, f;
                            e = c.slice(0, i), f = [];
                            for (b = 0, d = e.length; b < d; b++)j = e[b], f.push(j.compile(a, w));
                            return f
                        }(), "[" + f.join(", ") + "].concat(" + e.join(", ") + ")")
                    }, b
                }(e), a.While = X = function (a) {
                    function b(a, b) {
                        this.condition = (b != null ? b.invert : void 0) ? a.invert() : a, this.guard = b != null ? b.guard : void 0
                    }

                    return bm(b, a), b.prototype.children = ["condition", "guard", "body"], b.prototype.isStatement = Y, b.prototype.makeReturn = function (a) {
                        return a ? b.__super__.makeReturn.apply(this, arguments) : (this.returns = !this.jumps({loop: !0}), this)
                    }, b.prototype.addBody = function (a) {
                        return this.body = a, this
                    }, b.prototype.jumps = function () {
                        var a, b, c, d;
                        a = this.body.expressions;
                        if (!a.length)return!1;
                        for (c = 0, d = a.length; c < d; c++) {
                            b = a[c];
                            if (b.jumps({loop: !0}))return b
                        }
                        return!1
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d, e;
                        return a.indent += R, e = "", b = this.body, b.isEmpty() ? b = "" : (this.returns && (b.makeReturn(d = a.scope.freeVariable("results")), e = "" + this.tab + d + " = [];\n"), this.guard && (b.expressions.length > 1 ? b.expressions.unshift(new r((new H(this.guard)).invert(), new A("continue"))) : this.guard && (b = f.wrap([new r(this.guard, b)]))), b = "\n" + b.compile(a, z) + "\n" + this.tab), c = e + this.tab + ("while (" + this.condition.compile(a, y) + ") {" + b + "}"), this.returns && (c += "\n" + this.tab + "return " + d + ";"), c
                    }, b
                }(e), a.Op = F = function (a) {
                    function e(a, c, d, e) {
                        if (a === "in")return new s(c, d);
                        if (a === "do")return this.generateDo(c);
                        if (a === "new") {
                            if (c instanceof g && !c["do"] && !c.isNew)return c.newInstance();
                            if (c instanceof j && c.bound || c["do"])c = new H(c)
                        }
                        return this.operator = b[a] || a, this.first = c, this.second = d, this.flip = !!e, this
                    }

                    var b, c;
                    return bm(e, a), b = {"==": "===", "!=": "!==", of: "in"}, c = {"!==": "===", "===": "!=="}, e.prototype.children = ["first", "second"], e.prototype.isSimpleNumber = D, e.prototype.isUnary = function () {
                        return!this.second
                    }, e.prototype.isComplex = function () {
                        var a;
                        return!this.isUnary() || (a = this.operator) !== "+" && a !== "-" || this.first.isComplex()
                    }, e.prototype.isChainable = function () {
                        var a;
                        return(a = this.operator) === "<" || a === ">" || a === ">=" || a === "<=" || a === "===" || a === "!=="
                    }, e.prototype.invert = function () {
                        var a, b, d, f, g;
                        if (this.isChainable() && this.first.isChainable()) {
                            a = !0, b = this;
                            while (b && b.operator)a && (a = b.operator in c), b = b.first;
                            if (!a)return(new H(this)).invert();
                            b = this;
                            while (b && b.operator)b.invert = !b.invert, b.operator = c[b.operator], b = b.first;
                            return this
                        }
                        return(f = c[this.operator]) ? (this.operator = f, this.first.unwrap()instanceof e && this.first.invert(), this) : this.second ? (new H(this)).invert() : this.operator === "!" && (d = this.first.unwrap())instanceof e && ((g = d.operator) === "!" || g === "in" || g === "instanceof") ? d : new e("!", this)
                    }, e.prototype.unfoldSoak = function (a) {
                        var b;
                        return((b = this.operator) === "++" || b === "--" || b === "delete") && bh(a, this, "first")
                    }, e.prototype.generateDo = function (a) {
                        var b, c, e, f, h, i, k, l;
                        f = [], c = a instanceof d && (h = a.value.unwrap())instanceof j ? h : a, l = c.params || [];
                        for (i = 0, k = l.length; i < k; i++)e = l[i], e.value ? (f.push(e.value), delete e.value) : f.push(e);
                        return b = new g(a, f), b["do"] = !0, b
                    }, e.prototype.compileNode = function (a) {
                        var b, c, d, e;
                        c = this.isChainable() && this.first.isChainable(), c || (this.first.front = this.front);
                        if (this.operator === "delete" && a.scope.check(this.first.unwrapAll().value))throw SyntaxError("delete operand may not be argument or var");
                        if (((d = this.operator) === "--" || d === "++") && (e = this.first.unwrapAll().value, bn.call(M, e) >= 0))throw SyntaxError("prefix increment/decrement may not have eval or arguments operand");
                        return this.isUnary() ? this.compileUnary(a) : c ? this.compileChain(a) : this.operator === "?" ? this.compileExistence(a) : (b = this.first.compile(a, x) + " " + this.operator + " " + this.second.compile(a, x), a.level <= x ? b : "(" + b + ")")
                    }, e.prototype.compileChain = function (a) {
                        var b, c, d, e;
                        return e = this.first.second.cache(a), this.first.second = e[0], d = e[1], c = this.first.compile(a, x), b = "" + c + " " + (this.invert ? "&&" : "||") + " " + d.compile(a) + " " + this.operator + " " + this.second.compile(a, x), "(" + b + ")"
                    }, e.prototype.compileExistence = function (a) {
                        var b, c;
                        return this.first.isComplex() ? (c = new A(a.scope.freeVariable("ref")), b = new H(new d(c, this.first))) : (b = this.first, c = b), (new r(new l(b), c, {type: "if"})).addElse(this.second).compile(a)
                    }, e.prototype.compileUnary = function (a) {
                        var b, c, d;
                        if (a.level >= u)return(new H(this)).compile(a);
                        c = [b = this.operator], d = b === "+" || b === "-", (b === "new" || b === "typeof" || b === "delete" || d && this.first instanceof e && this.first.operator === b) && c.push(" ");
                        if (d && this.first instanceof e || b === "new" && this.first.isStatement(a))this.first = new H(this.first);
                        return c.push(this.first.compile(a, x)), this.flip && c.reverse(), c.join("")
                    }, e.prototype.toString = function (a) {
                        return e.__super__.toString.call(this, a, this.constructor.name + " " + this.operator)
                    }, e
                }(e), a.In = s = function (a) {
                    function b(a, b) {
                        this.object = a, this.array = b
                    }

                    return bm(b, a), b.prototype.children = ["object", "array"], b.prototype.invert = C, b.prototype.compileNode = function (a) {
                        var b, c, d, e, f;
                        if (this.array instanceof W && this.array.isArray()) {
                            f = this.array.base.objects;
                            for (d = 0, e = f.length; d < e; d++) {
                                c = f[d];
                                if (c instanceof P) {
                                    b = !0;
                                    break
                                }
                                continue
                            }
                            if (!b)return this.compileOrTest(a)
                        }
                        return this.compileLoopTest(a)
                    }, b.prototype.compileOrTest = function (a) {
                        var b, c, d, e, f, g, h, i, j;
                        return this.array.base.objects.length === 0 ? "" + !!this.negated : (i = this.object.cache(a, x), g = i[0], f = i[1], j = this.negated ? [" !== ", " && "] : [" === ", " || "], b = j[0], c = j[1], h = function () {
                            var c, h, i, j;
                            i = this.array.base.objects, j = [];
                            for (d = c = 0, h = i.length; c < h; d = ++c)e = i[d], j.push((d ? f : g) + b + e.compile(a, u));
                            return j
                        }.call(this), h = h.join(c), a.level < x ? h : "(" + h + ")")
                    }, b.prototype.compileLoopTest = function (a) {
                        var b, c, d, e;
                        return e = this.object.cache(a, w), d = e[0], c = e[1], b = bi("indexOf") + (".call(" + this.array.compile(a, w) + ", " + c + ") ") + (this.negated ? "< 0" : ">= 0"), d === c ? b : (b = d + ", " + b, a.level < w ? b : "(" + b + ")")
                    }, b.prototype.toString = function (a) {
                        return b.__super__.toString.call(this, a, this.constructor.name + (this.negated ? "!" : ""))
                    }, b
                }(e), a.Try = U = function (a) {
                    function b(a, b, c, d) {
                        this.attempt = a, this.error = b, this.recovery = c, this.ensure = d
                    }

                    return bm(b, a), b.prototype.children = ["attempt", "recovery", "ensure"], b.prototype.isStatement = Y, b.prototype.jumps = function (a) {
                        var b;
                        return this.attempt.jumps(a) || ((b = this.recovery) != null ? b.jumps(a) : void 0)
                    }, b.prototype.makeReturn = function (a) {
                        return this.attempt && (this.attempt = this.attempt.makeReturn(a)), this.recovery && (this.recovery = this.recovery.makeReturn(a)), this
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d, e;
                        return a.indent += R, d = this.error ? " (" + this.error.compile(a) + ") " : " ", e = this.attempt.compile(a, z), b = function () {
                            var b;
                            if (this.recovery) {
                                if (b = this.error.value, bn.call(M, b) >= 0)throw SyntaxError('catch variable may not be "' + this.error.value + '"');
                                return a.scope.check(this.error.value) || a.scope.add(this.error.value, "param"), " catch" + d + "{\n" + this.recovery.compile(a, z) + "\n" + this.tab + "}"
                            }
                            if (!this.ensure && !this.recovery)return" catch (_error) {}"
                        }.call(this), c = this.ensure ? " finally {\n" + this.ensure.compile(a, z) + "\n" + this.tab + "}" : "", "" + this.tab + "try {\n" + e + "\n" + this.tab + "}" + (b || "") + c
                    }, b
                }(e), a.Throw = T = function (a) {
                    function b(a) {
                        this.expression = a
                    }

                    return bm(b, a), b.prototype.children = ["expression"], b.prototype.isStatement = Y, b.prototype.jumps = D, b.prototype.makeReturn = S, b.prototype.compileNode = function (a) {
                        return this.tab + ("throw " + this.expression.compile(a) + ";")
                    }, b
                }(e), a.Existence = l = function (a) {
                    function b(a) {
                        this.expression = a
                    }

                    return bm(b, a), b.prototype.children = ["expression"], b.prototype.invert = C, b.prototype.compileNode = function (a) {
                        var b, c, d, e;
                        return this.expression.front = this.front, d = this.expression.compile(a, x), o.test(d) && !a.scope.check(d) ? (e = this.negated ? ["===", "||"] : ["!==", "&&"], b = e[0], c = e[1], d = "typeof " + d + " " + b + ' "undefined" ' + c + " " + d + " " + b + " null") : d = "" + d + " " + (this.negated ? "==" : "!=") + " null", a.level <= v ? d : "(" + d + ")"
                    }, b
                }(e), a.Parens = H = function (a) {
                    function b(a) {
                        this.body = a
                    }

                    return bm(b, a), b.prototype.children = ["body"], b.prototype.unwrap = function () {
                        return this.body
                    }, b.prototype.isComplex = function () {
                        return this.body.isComplex()
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d;
                        return d = this.body.unwrap(), d instanceof W && d.isAtomic() ? (d.front = this.front, d.compile(a)) : (c = d.compile(a, y), b = a.level < x && (d instanceof F || d instanceof g || d instanceof n && d.returns), b ? c : "(" + c + ")")
                    }, b
                }(e), a.For = n = function (a) {
                    function b(a, b) {
                        var c;
                        this.source = b.source, this.guard = b.guard, this.step = b.step, this.name = b.name, this.index = b.index, this.body = f.wrap([a]), this.own = !!b.own, this.object = !!b.object, this.object && (c = [this.index, this.name], this.name = c[0], this.index = c[1]);
                        if (this.index instanceof W)throw SyntaxError("index cannot be a pattern matching expression");
                        this.range = this.source instanceof W && this.source.base instanceof J && !this.source.properties.length, this.pattern = this.name instanceof W;
                        if (this.range && this.index)throw SyntaxError("indexes do not apply to range loops");
                        if (this.range && this.pattern)throw SyntaxError("cannot pattern match over range loops");
                        this.returns = !1
                    }

                    return bm(b, a), b.prototype.children = ["body", "source", "guard", "step"], b.prototype.compileNode = function (a) {
                        var b, c, e, g, h, i, j, k, l, m, n, p, q, s, t, u, v, y, B, C, D, E, F, G, I;
                        return b = f.wrap([this.body]), n = (I = bc(b.expressions)) != null ? I.jumps() : void 0, n && n instanceof K && (this.returns = !1), C = this.range ? this.source.base : this.source, B = a.scope, q = this.name && this.name.compile(a, w), j = this.index && this.index.compile(a, w), q && !this.pattern && B.find(q), j && B.find(j), this.returns && (y = B.freeVariable("results")), k = this.object && j || B.freeVariable("i"), l = this.range && q || j || k, m = l !== k ? "" + l + " = " : "", this.step && !this.range && (E = B.freeVariable("step")), this.pattern && (q = k), G = "", h = "", c = "", i = this.tab + R, this.range ? e = C.compile(bd(a, {index: k, name: q, step: this.step})) : (F = this.source.compile(a, w), (q || this.own) && !o.test(F) && (c = "" + this.tab + (t = B.freeVariable("ref")) + " = " + F + ";\n", F = t), q && !this.pattern && (s = "" + q + " = " + F + "[" + l + "]"), this.object || (p = B.freeVariable("len"), g = "" + m + k + " = 0, " + p + " = " + F + ".length", this.step && (g += ", " + E + " = " + this.step.compile(a, x)), D = "" + m + (this.step ? "" + k + " += " + E : l !== k ? "++" + k : "" + k + "++"), e = "" + g + "; " + k + " < " + p + "; " + D)), this.returns && (u = "" + this.tab + y + " = [];\n", v = "\n" + this.tab + "return " + y + ";", b.makeReturn(y)), this.guard && (b.expressions.length > 1 ? b.expressions.unshift(new r((new H(this.guard)).invert(), new A("continue"))) : this.guard && (b = f.wrap([new r(this.guard, b)]))), this.pattern && b.expressions.unshift(new d(this.name, new A("" + F + "[" + l + "]"))), c += this.pluckDirectCall(a, b), s && (G = "\n" + i + s + ";"), this.object && (e = "" + l + " in " + F, this.own && (h = "\n" + i + "if (!" + bi("hasProp") + ".call(" + F + ", " + l + ")) continue;")), b = b.compile(bd(a, {indent: i}), z), b && (b = "\n" + b + "\n"), "" + c + (u || "") + this.tab + "for (" + e + ") {" + h + G + b + this.tab + "}" + (v || "")
                    }, b.prototype.pluckDirectCall = function (a, b) {
                        var c, e, f, h, i, k, l, m, n, o, p, q, r, s, t;
                        e = "", o = b.expressions;
                        for (i = m = 0, n = o.length; m < n; i = ++m) {
                            f = o[i], f = f.unwrapAll();
                            if (!(f instanceof g))continue;
                            l = f.variable.unwrapAll();
                            if (l instanceof j || l instanceof W && ((p = l.base) != null ? p.unwrapAll() : void 0)instanceof j && l.properties.length === 1 && ((q = (r = l.properties[0].name) != null ? r.value : void 0) === "call" || q === "apply"))h = ((s = l.base) != null ? s.unwrapAll() : void 0) || l, k = new A(a.scope.freeVariable("fn")), c = new W(k), l.base && (t = [c, l], l.base = t[0], c = t[1]), b.expressions[i] = new g(c, f.args), e += this.tab + (new d(k, h)).compile(a, z) + ";\n"; else continue
                        }
                        return e
                    }, b
                }(X), a.Switch = Q = function (a) {
                    function b(a, b, c) {
                        this.subject = a, this.cases = b, this.otherwise = c
                    }

                    return bm(b, a), b.prototype.children = ["subject", "cases", "otherwise"], b.prototype.isStatement = Y, b.prototype.jumps = function (a) {
                        var b, c, d, e, f, g, h;
                        a == null && (a = {block: !0}), f = this.cases;
                        for (d = 0, e = f.length; d < e; d++) {
                            g = f[d], c = g[0], b = g[1];
                            if (b.jumps(a))return b
                        }
                        return(h = this.otherwise) != null ? h.jumps(a) : void 0
                    }, b.prototype.makeReturn = function (a) {
                        var b, c, d, e, g;
                        e = this.cases;
                        for (c = 0, d = e.length; c < d; c++)b = e[c], b[1].makeReturn(a);
                        return a && (this.otherwise || (this.otherwise = new f([new A("void 0")]))), (g = this.otherwise) != null && g.makeReturn(a), this
                    }, b.prototype.compileNode = function (a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
                        i = a.indent + R, j = a.indent = i + R, d = this.tab + ("switch (" + (((o = this.subject) != null ? o.compile(a, y) : void 0) || !1) + ") {\n"), p = this.cases;
                        for (h = k = 0, m = p.length; k < m; h = ++k) {
                            q = p[h], f = q[0], b = q[1], r = bb([f]);
                            for (l = 0, n = r.length; l < n; l++)e = r[l], this.subject || (e = e.invert()), d += i + ("case " + e.compile(a, y) + ":\n");
                            if (c = b.compile(a, z))d += c + "\n";
                            if (h === this.cases.length - 1 && !this.otherwise)break;
                            g = this.lastNonComment(b.expressions);
                            if (g instanceof K || g instanceof A && g.jumps() && g.value !== "debugger")continue;
                            d += j + "break;\n"
                        }
                        return this.otherwise && this.otherwise.expressions.length && (d += i + ("default:\n" + this.otherwise.compile(a, z) + "\n")), d + this.tab + "}"
                    }, b
                }(e), a.If = r = function (a) {
                    function b(a, b, c) {
                        this.body = b, c == null && (c = {}), this.condition = c.type === "unless" ? a.invert() : a, this.elseBody = null, this.isChain = !1, this.soak = c.soak
                    }

                    return bm(b, a), b.prototype.children = ["condition", "body", "elseBody"], b.prototype.bodyNode = function () {
                        var a;
                        return(a = this.body) != null ? a.unwrap() : void 0
                    }, b.prototype.elseBodyNode = function () {
                        var a;
                        return(a = this.elseBody) != null ? a.unwrap() : void 0
                    }, b.prototype.addElse = function (a) {
                        return this.isChain ? this.elseBodyNode().addElse(a) : (this.isChain = a instanceof b, this.elseBody = this.ensureBlock(a)), this
                    }, b.prototype.isStatement = function (a) {
                        var b;
                        return(a != null ? a.level : void 0) === z || this.bodyNode().isStatement(a) || ((b = this.elseBodyNode()) != null ? b.isStatement(a) : void 0)
                    }, b.prototype.jumps = function (a) {
                        var b;
                        return this.body.jumps(a) || ((b = this.elseBody) != null ? b.jumps(a) : void 0)
                    }, b.prototype.compileNode = function (a) {
                        return this.isStatement(a) ? this.compileStatement(a) : this.compileExpression(a)
                    }, b.prototype.makeReturn = function (a) {
                        return a && (this.elseBody || (this.elseBody = new f([new A("void 0")]))), this.body && (this.body = new f([this.body.makeReturn(a)])), this.elseBody && (this.elseBody = new f([this.elseBody.makeReturn(a)])), this
                    }, b.prototype.ensureBlock = function (a) {
                        return a instanceof f ? a : new f([a])
                    }, b.prototype.compileStatement = function (a) {
                        var c, d, e, f, g;
                        return d = $(a, "chainChild"), f = $(a, "isExistentialEquals"), f ? (new b(this.condition.invert(), this.elseBodyNode(), {type: "if"})).compile(a) : (e = this.condition.compile(a, y), a.indent += R, c = this.ensureBlock(this.body), g = "if (" + e + ") {\n" + c.compile(a) + "\n" + this.tab + "}", d || (g = this.tab + g), this.elseBody ? g + " else " + (this.isChain ? (a.indent = this.tab, a.chainChild = !0, this.elseBody.unwrap().compile(a, z)) : "{\n" + this.elseBody.compile(a, z) + "\n" + this.tab + "}") : g)
                    }, b.prototype.compileExpression = function (a) {
                        var b, c, d, e;
                        return e = this.condition.compile(a, v), c = this.bodyNode().compile(a, w), b = this.elseBodyNode() ? this.elseBodyNode().compile(a, w) : "void 0", d = "" + e + " ? " + c + " : " + b, a.level >= v ? "(" + d + ")" : d
                    }, b.prototype.unfoldSoak = function () {
                        return this.soak && this
                    }, b
                }(e), i = {wrap: function (a, c, d) {
                    var e, h, i, k, l;
                    if (a.jumps())return a;
                    i = new j([], f.wrap([a])), e = [];
                    if ((k = a.contains(this.literalArgs)) || a.contains(this.literalThis))l = new A(k ? "apply" : "call"), e = [new A("this")], k && e.push(new A("arguments")), i = new W(i, [new b(l)]);
                    return i.noReturn = d, h = new g(i, e), c ? f.wrap([h]) : h
                }, literalArgs: function (a) {
                    return a instanceof A && a.value === "arguments" && !a.asKey
                }, literalThis: function (a) {
                    return a instanceof A && a.value === "this" && !a.asKey || a instanceof j && a.bound || a instanceof g && a.isSuper
                }}, bh = function (a, b, c) {
                    var d;
                    if (!(d = b[c].unfoldSoak(a)))return;
                    return b[c] = d.body, d.body = new W(b), d
                }, V = {"extends": function () {
                    return"function(child, parent) { for (var key in parent) { if (" + bi("hasProp") + ".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }"
                }, bind: function () {
                    return"function(fn, me){ return function(){ return fn.apply(me, arguments); }; }"
                }, indexOf: function () {
                    return"[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }"
                }, hasProp: function () {
                    return"{}.hasOwnProperty"
                }, slice: function () {
                    return"[].slice"
                }}, z = 1, y = 2, w = 3, v = 4, x = 5, u = 6, R = "  ", p = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*", o = RegExp("^" + p + "$"), L = /^[+-]?\d+$/, B = RegExp("^(?:(" + p + ")\\.prototype(?:\\.(" + p + ")|\\[(\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*')\\]|\\[(0x[\\da-fA-F]+|\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\]))|(" + p + ")$"), q = /^['"]/, bi = function (a) {
                    var b;
                    return b = "__" + a, N.root.assign(b, V[a]()), b
                }, be = function (a, b) {
                    return a = a.replace(/\n/g, "$&" + b), a.replace(/\s+$/, "")
                }
            })).call(this)
        }, require["./coffee-script"] = new function () {
            var a = this;
            ((function () {
                var b, c, d, e, f, g, h, i, j, k, l = {}.hasOwnProperty;
                e = require("fs"), h = require("path"), k = require("./lexer"), b = k.Lexer, c = k.RESERVED, g = require("./parser").parser, j = require("vm"), i = function (a) {
                    return a.charCodeAt(0) === 65279 ? a.substring(1) : a
                }, require.extensions && (require.extensions[".coffee"] = function (a, b) {
                    var c;
                    return c = d(i(e.readFileSync(b, "utf8")), {filename: b}), a._compile(c, b)
                }), a.VERSION = "1.4.0", a.RESERVED = c, a.helpers = require("./helpers"), a.compile = d = function (b, c) {
                    var d, e, h;
                    c == null && (c = {}), h = a.helpers.merge;
                    try {
                        e = g.parse(f.tokenize(b)).compile(c);
                        if (!c.header)return e
                    } catch (i) {
                        throw c.filename && (i.message = "In " + c.filename + ", " + i.message), i
                    }
                    return d = "Generated by CoffeeScript " + this.VERSION, "// " + d + "\n" + e
                }, a.tokens = function (a, b) {
                    return f.tokenize(a, b)
                }, a.nodes = function (a, b) {
                    return typeof a == "string" ? g.parse(f.tokenize(a, b)) : g.parse(a)
                }, a.run = function (a, b) {
                    var c;
                    return b == null && (b = {}), c = require.main, c.filename = process.argv[1] = b.filename ? e.realpathSync(b.filename) : ".", c.moduleCache && (c.moduleCache = {}), c.paths = require("module")._nodeModulePaths(h.dirname(e.realpathSync(b.filename))), h.extname(c.filename) !== ".coffee" || require.extensions ? c._compile(d(a, b), c.filename) : c._compile(a, c.filename)
                }, a.eval = function (a, b) {
                    var c, e, f, g, i, k, m, n, o, p, q, r, s, t;
                    b == null && (b = {});
                    if (!(a = a.trim()))return;
                    e = j.Script;
                    if (e) {
                        if (b.sandbox != null) {
                            if (b.sandbox instanceof e.createContext().constructor)m = b.sandbox; else {
                                m = e.createContext(), r = b.sandbox;
                                for (g in r) {
                                    if (!l.call(r, g))continue;
                                    n = r[g], m[g] = n
                                }
                            }
                            m.global = m.root = m.GLOBAL = m
                        } else m = global;
                        m.__filename = b.filename || "eval", m.__dirname = h.dirname(m.__filename);
                        if (m === global && !m.module && !m.require) {
                            c = require("module"), m.module = q = new c(b.modulename || "eval"), m.require = t = function (a) {
                                return c._load(a, q, !0)
                            }, q.filename = m.__filename, s = Object.getOwnPropertyNames(require);
                            for (o = 0, p = s.length; o < p; o++)k = s[o], k !== "paths" && (t[k] = require[k]);
                            t.paths = q.paths = c._nodeModulePaths(process.cwd()), t.resolve = function (a) {
                                return c._resolveFilename(a, q)
                            }
                        }
                    }
                    i = {};
                    for (g in b) {
                        if (!l.call(b, g))continue;
                        n = b[g], i[g] = n
                    }
                    return i.bare = !0, f = d(a, i), m === global ? j.runInThisContext(f) : j.runInContext(f, m)
                }, f = new b, g.lexer = {lex: function () {
                    var a, b;
                    return b = this.tokens[this.pos++] || [""], a = b[0], this.yytext = b[1], this.yylineno = b[2], a
                }, setInput: function (a) {
                    return this.tokens = a, this.pos = 0
                }, upcomingInput: function () {
                    return""
                }}, g.yy = require("./nodes")
            })).call(this)
        }, require["./browser"] = new function () {
            var exports = this;
            ((function () {
                var CoffeeScript, runScripts;
                CoffeeScript = require("./coffee-script"), CoffeeScript.require = require, CoffeeScript.eval = function (code, options) {
                    var _ref;
                    return options == null && (options = {}), (_ref = options.bare) == null && (options.bare = !0), eval(CoffeeScript.compile(code, options))
                }, CoffeeScript.run = function (a, b) {
                    return b == null && (b = {}), b.bare = !0, Function(CoffeeScript.compile(a, b))()
                };
                if (typeof window == "undefined" || window === null)return;
                CoffeeScript.load = function (a, b) {
                    var c;
                    return c = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest, c.open("GET", a, !0), "overrideMimeType"in c && c.overrideMimeType("text/plain"), c.onreadystatechange = function () {
                        var d;
                        if (c.readyState === 4) {
                            if ((d = c.status) === 0 || d === 200)CoffeeScript.run(c.responseText); else throw new Error("Could not load " + a);
                            if (b)return b()
                        }
                    }, c.send(null)
                }, runScripts = function () {
                    var a, b, c, d, e, f;
                    return f = document.getElementsByTagName("script"), a = function () {
                        var a, b, c;
                        c = [];
                        for (a = 0, b = f.length; a < b; a++)e = f[a], e.type === "text/coffeescript" && c.push(e);
                        return c
                    }(), c = 0, d = a.length, (b = function () {
                        var d;
                        d = a[c++];
                        if ((d != null ? d.type : void 0) === "text/coffeescript")return d.src ? CoffeeScript.load(d.src, b) : (CoffeeScript.run(d.innerHTML), b())
                    })(), null
                }, window.addEventListener ? addEventListener("DOMContentLoaded", runScripts, !1) : attachEvent("onload", runScripts)
            })).call(this)
        }, require["./coffee-script"]
    }();
    typeof define == "function" && define.amd ? define(function () {
        return CoffeeScript
    }) : root.CoffeeScript = CoffeeScript
})(this)