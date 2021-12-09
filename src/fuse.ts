import Fuse from 'fuse.js';

export const createFuseSearchInstance = (data: any, options: any) => {
	const fuse = new Fuse(data, options)
	return fuse;
}
