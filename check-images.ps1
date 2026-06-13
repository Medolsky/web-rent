Add-Type -AssemblyName System.Drawing
Get-ChildItem -Path '.\assets\image' -Recurse -Include *.png,*.jpg,*.jpeg | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Output ('{0}: {1}x{2} ({3} KB)' -f $_.Name, $img.Width, $img.Height, [math]::Round($_.Length/1024))
    $img.Dispose()
}
