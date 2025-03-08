using Microsoft.AspNetCore.Components;
using System.Diagnostics;

namespace BlazorPerformance;

public class MessurableComponent : ComponentBase
{
    protected int ElementsCount = 0;
    private double RenderTime = 0.0;

    protected readonly Stopwatch stopwatch = new();
    private bool shouldRender = true;

    protected override bool ShouldRender()
    {
        if (shouldRender)
            stopwatch.Restart();
        return shouldRender;
    }

    protected override void OnAfterRender(bool firstRender)
    {
        stopwatch.Stop();
        shouldRender = false;
        RenderTime = stopwatch.Elapsed.TotalMilliseconds;
        if(ElementsCount != 0)
            Console.WriteLine($"Elements count: {ElementsCount} Time: {RenderTime} ms");
    }

    protected void ForceRender()
    {
        shouldRender = true;
        StateHasChanged();
    }

    protected void Clear()
    {
        shouldRender = true;
        ElementsCount = 0;
    }
}
