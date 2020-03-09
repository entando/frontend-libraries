const envs = envOverrides => (
  import(/* webpackChunkName: 'environment' */ envOverrides).then((data) => {
    process.entando = { ...process.env, ...data };
  })
);

export default envs;
