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
      	}
      }
  });
