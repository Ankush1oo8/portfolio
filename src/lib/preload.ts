export function preload(components: (() => Promise<any>)[]) {
  return Promise.all(components.map(component => component()));
}