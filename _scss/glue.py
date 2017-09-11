import os

walk_dir = "."

selected_fnames = []

for folder, subs, files in os.walk(walk_dir):
	for fname in files:
		if not fname.endswith(".scss"):
			continue
		if fname == "_variables.scss":
			selected_fnames = [fname] + selected_fnames
		elif fname == "all.scss":
			continue
		else:
			selected_fnames.append(fname)

with open('all.scss', 'w') as f:
	for selected_fname in selected_fnames:
		f.write("@import \"%s\";\n" % (selected_fname.replace('_', '')))
