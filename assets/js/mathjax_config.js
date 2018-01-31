MathJax.Hub.Config({
	extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js"],
	jax: ["input/TeX", "output/HTML-CSS"],
	tex2jax: {
		inlineMath: [ ['$','$'], ["\\(","\\)"] ],
		displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
		processEscapes: true,
		processEnvironments: true
	},
	"HTML-CSS": { 
		availableFonts: ["TeX"],
		linebreaks: { automatic: true },
		scale: 90,
	},
	TeX: {
		TagSide: "left",
		Macros: {
      		// Define macros here
      		// http://docs.mathjax.org/en/latest/tex.html#defining-tex-macros
      		// abs: ['\\left\\lvert #2 \\right\\rvert_{\\text{#1}}', 2, ""],
      		txt: ['\\hspace{3pt}\\text{#1}\\hspace{3pt}', 1],
      		dim: ['{\\color{gray}#1}', 1]
      	},
      	extensions: ["color.js"]
      }
  });
