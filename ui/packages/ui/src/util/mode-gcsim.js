ace.define(
  'ace/mode/doc_comment_highlight_rules',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/text_highlight_rules',
  ],
  function (require, exports, module) {
    'use strict';
    var oop = require('../lib/oop');
    var TextHighlightRules =
      require('./text_highlight_rules').TextHighlightRules;
    var DocCommentHighlightRules = function () {
      this.$rules = {
        start: [
          {
            token: 'comment.doc.tag',
            regex: '@\\w+(?=\\s|$)',
          },
          DocCommentHighlightRules.getTagRule(),
          {
            defaultToken: 'comment.doc',
            caseInsensitive: true,
          },
        ],
      };
    };
    oop.inherits(DocCommentHighlightRules, TextHighlightRules);
    DocCommentHighlightRules.getTagRule = function (start) {
      return {
        token: 'comment.doc.tag.storage.type',
        regex: '\\b(?:TODO|FIXME|XXX|HACK)\\b',
      };
    };
    DocCommentHighlightRules.getStartRule = function (start) {
      return {
        token: 'comment.doc', // doc comment
        regex: '\\/\\*(?=\\*)',
        next: start,
      };
    };
    DocCommentHighlightRules.getEndRule = function (start) {
      return {
        token: 'comment.doc', // closing comment
        regex: '\\*\\/',
        next: start,
      };
    };
    exports.DocCommentHighlightRules = DocCommentHighlightRules;
  },
);

ace.define(
  'ace/mode/gcsim_highlight_rules',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/doc_comment_highlight_rules',
    'ace/mode/text_highlight_rules',
  ],
  function (require, exports, module) {
    var oop = require('../lib/oop');
    var DocCommentHighlightRules =
      require('./doc_comment_highlight_rules').DocCommentHighlightRules;
    var TextHighlightRules =
      require('./text_highlight_rules').TextHighlightRules;
    var gcsimHighlightRules = function () {
      // var builtinTypes =
      //   "string|uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|" +
      //   "float64|complex64|complex128|byte|rune|uint|int|uintptr|bool|error";
      // var builtinFunctions =
      //   "new|close|cap|copy|panic|panicln|print|println|len|make|delete|real|recover|imag|append";
      // var builtinConstants = "nil|true|false|iota";
      var gcsimKeywords =
        'let|while|if|else|fn|switch|case|default|break|continue|fallthrough|return|for|' +
        'options|add|char|stats|weapon|set|lvl|refine|cons|talent|count|active|target|particle_threshold|particle_drop_count|resist|energy|hurt';
      var gcsimAvatars =
        'traveleranemo|travelergeo|travelerelectro|travelerdendro|travelerhydro|travelerpyro|travelercryo|aether-anemo|lumine-anemo|aether-geo|lumine-geo|aether-electro|lumine-electro|aether-dendro|lumine-dendro|aether-hydro|lumine-hydro|aether-pyro|lumine-pyro|aether-cryo|lumine-cryo|aetheranemo|lumineanemo|aethergeo|luminegeo|aetherelectro|lumineelectro|aetherdendro|luminedendro|aetherhydro|luminehydro|aetherpyro|luminepyro|aethercryo|luminecryo|albedo|aloy|amber|barbara|barb|beidou|bennett|charlotte|chongyun|chong|cyno|diluc|diona|eula|fischl|fish|amy|ganyu|hutao|tao|ht|jean|kaedeharakazuha|kazuha|kaz|kaeya|kamisatoayaka|ayaka|kamisatoayato|ayato|keqing|keq|klee|kujousara|kujosara|sara|lisa|mona|ningguang|ning|noelle|qiqi|raidenshogun|raiden|herexcellencythealmightynarukamiogoshogodofthunder|razor|rosaria|rosa|sangonomiyakokomi|kokomi|koko|sayu|sucrose|tartaglia|childe|thoma|venti|xiangling|xl|xianyun|cloudretainer|liuyun|xiao|xingqiu|xq|xinyan|yanfei|yoimiya|yoi|yunjin|zhongli|zhong|zl|gorou|aratakiitto|itto|aratakitheoneandoniitto|shenhe|yae|yaemiko|yelan|kukishinobu|kuki|shikanoinheizou|heizou|tighnari|collei|dori|candace|nilou|kusanali|lesserlordkusanali|nahida|layla|faruzan|faru|wanderer|scaramouche|scara|kunikuzushi|kuni|kabukimono|alhaitham|haitham|baizhu|dehya|yaoyao|mika|kaveh|kirara|lyney|lynette|neuvillette|neuv|chiefjusticeoffontaine|freminet|furina|furinadefontaine|navia|demoiselle|wriothesley|wrio|chevreuse|chev|gaming|chiori|arlecchino|arle|clorinde|emilie|mualani|sethos|xilonen|xilo|sigewinne|kinich|ororon|olorun|chasca|lanyan|mavuika|mav|citlali|mizuki|escoffier|esco';
      var gcsimAbilities =
        'attack|charge|aim|skill|burst|low_plunge|high_plunge|dash|jump|walk|swap';
      var gcsimStats = '\\b(hp%?|atk%?|def%?|er|em|cr|cd|heal|phys%)(?!\\w)';
      var gcsimOthers =
        '(interval|every|once|amount|electro%?|element|resist|pyro%?|dendro%?|hydro%?|geo%?|anemo%?|physical|cryo%?|start_hp%?|start_energy|pos|radius|freeze_resist)';
      var gcsimOptions =
        'iteration|duration|swap_delay|workers|hitlag|defhalt|ignore_burst_energy';
      var keywordMapper = this.createKeywordMapper(
        {
          keyword: gcsimKeywords,
          // "constant.language": builtinConstants,
          // "support.function": builtinFunctions,
          // "support.type": builtinTypes,
          'support.function': gcsimAbilities,
          'support.class': gcsimOptions,
          'constant.language': gcsimAvatars,
        },
        '',
      );
      var stringEscapeRe =
        '\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv\'"\\\\])'.replace(
          /\\h/g,
          '[a-fA-F\\d]',
        );
      this.$rules = {
        start: [
          {
            token: 'comment',
            regex: '\\/\\/.*$',
          },
          {
            token: 'comment',
            regex: '\\#.*$',
          },
          DocCommentHighlightRules.getStartRule('doc-start'),
          {
            token: 'comment.start', // multi line comment
            regex: '\\/\\*',
            next: 'comment',
          },
          {
            token: 'string', // single line
            regex: /"(?:[^"\\]|\\.)*?"/,
          },
          {
            token: 'string', // raw
            regex: '`',
            next: 'bqstring',
          },
          {
            token: 'support.variable',
            regex: gcsimStats + '|' + gcsimOthers,
          },
          {
            token: 'constant.numeric', // rune
            regex:
              "'(?:[^\\'\uD800-\uDBFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|" +
              stringEscapeRe.replace('"', '') +
              ")'",
          },
          {
            token: 'constant.numeric', // hex
            regex: '0[xX][0-9a-fA-F]+\\b',
          },
          {
            token: 'constant.numeric', // float
            regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
          },
          {
            token: ['keyword', 'text', 'entity.name.function'],
            regex: '(func)(\\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)\\b',
          },
          {
            token: function (val) {
              if (val[val.length - 1] == '(') {
                return [
                  {
                    type: keywordMapper(val.slice(0, -1)) || 'support.function',
                    value: val.slice(0, -1),
                  },
                  {
                    type: 'paren.lparen',
                    value: val.slice(-1),
                  },
                ];
              }
              return keywordMapper(val) || 'identifier';
            },
            regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?',
          },
          {
            token: 'keyword.operator',
            regex:
              '!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=',
          },
          {
            token: 'punctuation.operator',
            regex: '\\?|\\:|\\,|\\;|\\.',
          },
          {
            token: 'paren.lparen',
            regex: '[[({]',
          },
          {
            token: 'paren.rparen',
            regex: '[\\])}]',
          },
          {
            token: 'text',
            regex: '\\s+',
          },
        ],
        comment: [
          {
            token: 'comment.end',
            regex: '\\*\\/',
            next: 'start',
          },
          {
            defaultToken: 'comment',
          },
        ],
        bqstring: [
          {
            token: 'string',
            regex: '`',
            next: 'start',
          },
          {
            defaultToken: 'string',
          },
        ],
      };
      this.embedRules(DocCommentHighlightRules, 'doc-', [
        DocCommentHighlightRules.getEndRule('start'),
      ]);
    };
    oop.inherits(gcsimHighlightRules, TextHighlightRules);
    exports.GolangHighlightRules = gcsimHighlightRules;
  },
);

ace.define(
  'ace/mode/matching_brace_outdent',
  ['require', 'exports', 'module', 'ace/range'],
  function (require, exports, module) {
    'use strict';
    var Range = require('../range').Range;
    var MatchingBraceOutdent = function () {};
    (function () {
      this.checkOutdent = function (line, input) {
        if (!/^\s+$/.test(line)) return false;
        return /^\s*\}/.test(input);
      };
      this.autoOutdent = function (doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);
        if (!match) return 0;
        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({
          row: row,
          column: column,
        });
        if (!openBracePos || openBracePos.row == row) return 0;
        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column - 1), indent);
      };
      this.$getIndent = function (line) {
        return line.match(/^\s*/)[0];
      };
    }).call(MatchingBraceOutdent.prototype);
    exports.MatchingBraceOutdent = MatchingBraceOutdent;
  },
);

ace.define(
  'ace/mode/folding/cstyle',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/range',
    'ace/mode/folding/fold_mode',
  ],
  function (require, exports, module) {
    'use strict';
    var oop = require('../../lib/oop');
    var Range = require('../../range').Range;
    var BaseFoldMode = require('./fold_mode').FoldMode;
    var FoldMode = (exports.FoldMode = function (commentRegex) {
      if (commentRegex) {
        this.foldingStartMarker = new RegExp(
          this.foldingStartMarker.source.replace(
            /\|[^|]*?$/,
            '|' + commentRegex.start,
          ),
        );
        this.foldingStopMarker = new RegExp(
          this.foldingStopMarker.source.replace(
            /\|[^|]*?$/,
            '|' + commentRegex.end,
          ),
        );
      }
    });
    oop.inherits(FoldMode, BaseFoldMode);
    (function () {
      this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
      this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
      this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
      this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
      this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
      this._getFoldWidgetBase = this.getFoldWidget;
      this.getFoldWidget = function (session, foldStyle, row) {
        var line = session.getLine(row);
        if (this.singleLineBlockCommentRe.test(line)) {
          if (
            !this.startRegionRe.test(line) &&
            !this.tripleStarBlockCommentRe.test(line)
          )
            return '';
        }
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
        if (!fw && this.startRegionRe.test(line)) return 'start'; // lineCommentRegionStart
        return fw;
      };
      this.getFoldWidgetRange = function (
        session,
        foldStyle,
        row,
        forceMultiline,
      ) {
        var line = session.getLine(row);
        if (this.startRegionRe.test(line))
          return this.getCommentRegionBlock(session, line, row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
          var i = match.index;
          if (match[1])
            return this.openingBracketBlock(session, match[1], row, i);
          var range = session.getCommentFoldRange(row, i + match[0].length, 1);
          if (range && !range.isMultiLine()) {
            if (forceMultiline) {
              range = this.getSectionRange(session, row);
            } else if (foldStyle != 'all') range = null;
          }
          return range;
        }
        if (foldStyle === 'markbegin') return;
        var match = line.match(this.foldingStopMarker);
        if (match) {
          var i = match.index + match[0].length;
          if (match[1])
            return this.closingBracketBlock(session, match[1], row, i);
          return session.getCommentFoldRange(row, i, -1);
        }
      };
      this.getSectionRange = function (session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
          line = session.getLine(row);
          var indent = line.search(/\S/);
          if (indent === -1) continue;
          if (startIndent > indent) break;
          var subRange = this.getFoldWidgetRange(session, 'all', row);
          if (subRange) {
            if (subRange.start.row <= startRow) {
              break;
            } else if (subRange.isMultiLine()) {
              row = subRange.end.row;
            } else if (startIndent == indent) {
              break;
            }
          }
          endRow = row;
        }
        return new Range(
          startRow,
          startColumn,
          endRow,
          session.getLine(endRow).length,
        );
      };
      this.getCommentRegionBlock = function (session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
          line = session.getLine(row);
          var m = re.exec(line);
          if (!m) continue;
          if (m[1]) depth--;
          else depth++;
          if (!depth) break;
        }
        var endRow = row;
        if (endRow > startRow) {
          return new Range(startRow, startColumn, endRow, line.length);
        }
      };
    }).call(FoldMode.prototype);
  },
);

ace.define(
  'ace/mode/gcsim',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/text',
    'ace/mode/gcsim_highlight_rules',
    'ace/mode/matching_brace_outdent',
    'ace/mode/folding/cstyle',
  ],
  function (require, exports, module) {
    var oop = require('../lib/oop');
    var TextMode = require('./text').Mode;
    var gcsimHighlightRules =
      require('./gcsim_highlight_rules').GolangHighlightRules;
    var MatchingBraceOutdent =
      require('./matching_brace_outdent').MatchingBraceOutdent;
    var CStyleFoldMode = require('./folding/cstyle').FoldMode;
    var Mode = function () {
      this.HighlightRules = gcsimHighlightRules;
      this.$outdent = new MatchingBraceOutdent();
      this.foldingRules = new CStyleFoldMode();
      this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function () {
      this.lineCommentStart = '//';
      this.blockComment = {start: '/*', end: '*/'};
      this.getNextLineIndent = function (state, line, tab) {
        var indent = this.$getIndent(line);
        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;
        if (tokens.length && tokens[tokens.length - 1].type == 'comment') {
          return indent;
        }
        if (state == 'start') {
          var match = line.match(/^.*[\{\(\[]\s*$/);
          if (match) {
            indent += tab;
          }
        }
        return indent;
      }; //end getNextLineIndent
      this.checkOutdent = function (state, line, input) {
        return this.$outdent.checkOutdent(line, input);
      };
      this.autoOutdent = function (state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
      };
      this.$id = 'ace/mode/golang';
    }).call(Mode.prototype);
    exports.Mode = Mode;
  },
);
(function () {
  ace.require(['ace/mode/gcsim'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
