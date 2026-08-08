import path from 'path';

import chokidar from 'chokidar';
import { debounce } from 'perfect-debounce';

export type DebouncedWatcherOptions = {
	rootDir: string;
	debounceMs?: number;
	filter?: (filepath: string) => boolean;
	onChange: (changedPaths: string[]) => void | Promise<void>;
};

export type DebouncedWatcher = {
	dispose: () => void;
};

export function createDebouncedWatcher(options: DebouncedWatcherOptions): DebouncedWatcher {
	const { rootDir, debounceMs = 50, filter = () => true, onChange } = options;

	const changed = new Set<string>();
	const debounced = debounce(async () => {
		if (changed.size === 0) {
			return;
		}
		const changedList = Array.from(changed);
		changed.clear();
		await onChange(changedList);
	}, debounceMs);

	const watcher = chokidar.watch(rootDir, {
		ignoreInitial: true,
		persistent: true,
		awaitWriteFinish: true,
	});

	watcher.on('add', file => {
		const rel = path.relative(rootDir, file);
		if (filter(rel)) {
			changed.add(file);
			debounced();
		}
	});

	watcher.on('change', file => {
		const rel = path.relative(rootDir, file);
		if (filter(rel)) {
			changed.add(file);
			debounced();
		}
	});

	watcher.on('unlink', file => {
		const rel = path.relative(rootDir, file);
		if (filter(rel)) {
			changed.add(file);
			debounced();
		}
	});

	return {
		dispose: () => watcher.close(),
	};
}
