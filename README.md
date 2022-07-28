# ts-lambda-layers
Simple example to show an issue when building a TS project with a local module being used as layer.

## To reproduce the error
Build without using a container and it will error when attempting to copy the layer module from the scratch directory into `.aws-sam/deps`. Since the layer module was not copied into the scratch directory and the layer module is relative path within the `theLambda.package.json` the `cp` operation fails because the file doesn't exist.

``` sam build --beta-features --debug ```

```
2022-07-28 16:12:36,886 | Copying source file (/var/folders/ld/xqtng3g166n4w0vbv0g2y3q80000gp/T/tmpkj5q7uv7/node_modules/theLayer) to destination (.aws-sam/deps/3e01d3a7-fcb6-4a99-acd5-343427405b35/node_modules/theLayer)
2022-07-28 16:12:36,886 | NodejsNpmEsbuildBuilder:CopyDependencies raised unhandled exception
Traceback (most recent call last):
  File "/opt/homebrew/Cellar/aws-sam-cli/1.53.0/libexec/lib/python3.8/site-packages/aws_lambda_builders/workflow.py", line 301, in run
    action.execute()
  File "/opt/homebrew/Cellar/aws-sam-cli/1.53.0/libexec/lib/python3.8/site-packages/aws_lambda_builders/actions.py", line 132, in execute
    copytree(dependencies_source, new_destination)
  File "/opt/homebrew/Cellar/aws-sam-cli/1.53.0/libexec/lib/python3.8/site-packages/aws_lambda_builders/utils.py", line 79, in copytree
    shutil.copy2(new_source, new_destination)
  File "/opt/homebrew/Cellar/python@3.8/3.8.13_1/Frameworks/Python.framework/Versions/3.8/lib/python3.8/shutil.py", line 435, in copy2
    copyfile(src, dst, follow_symlinks=follow_symlinks)
  File "/opt/homebrew/Cellar/python@3.8/3.8.13_1/Frameworks/Python.framework/Versions/3.8/lib/python3.8/shutil.py", line 264, in copyfile
    with open(src, 'rb') as fsrc, open(dst, 'wb') as fdst:
FileNotFoundError: [Errno 2] No such file or directory: '/var/folders/ld/xqtng3g166n4w0vbv0g2y3q80000gp/T/tmpkj5q7uv7/node_modules/theLayer
```


### To build cleanly, deploy and test ###

The following will deploy the lambda and demonstrating it working correctly. Note that is using the `--use-container` flad within the `sam build` command.

`sam build --use-container --beta-features`

`sam deploy`

`aws lambda invoke --function-name <funciton-name-from-output-of-stack> >(jq '.message') --invocation-type RequestResponse`

`'hello'`
