import os
import re

walk_dir = '.'

for folder, subs, files in os.walk(walk_dir):
	# print('folder:', folder, '--> subs:', subs, '--> files:', files)
	for fname in files:
		if not fname.endswith(".md"):
			continue
		full_fname = os.path.join(folder, fname)

		# Parse date
		with open(full_fname, 'r') as f:
			m = re.search('date: *([0-9]{4}-[0-9]{2}-[0-9]{2}) 00:00:00', f.read())
			date = m.group(1)

		m = re.search('([0-9]{4}-[0-9]{2}-[0-9]{2})-(.*)', fname)
		
		if m is not None:
			continue

		# Asume that if date appears in the file name, it should be correct
		fname_with_date = "%s-%s" % (date, fname)
		full_fname_with_date = os.path.join(folder, fname_with_date) 
		print('Rename: %s --> %s' % (full_fname, full_fname_with_date))
		os.rename(full_fname, full_fname_with_date)

		
