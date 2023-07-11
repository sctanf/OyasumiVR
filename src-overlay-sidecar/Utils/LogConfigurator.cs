using System.Diagnostics;
using Serilog;
using Serilog.Core;

namespace overlay_sidecar;

public class LogConfigurator {
  private static Logger? _logger;

  public static Logger Logger => _logger!;

  public static void Init()
  {
    var logPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
      "co.raphii.oyasumi\\logs\\OyasumiVR_Overlay_Core_.log");
    var config = new LoggerConfiguration()
      .WriteTo.Console()
      .WriteTo.Debug()
      .WriteTo.File(logPath, rollingInterval: RollingInterval.Day, retainedFileTimeLimit: TimeSpan.FromDays(7));
    if (Debugger.IsAttached)
      config = config.MinimumLevel.Debug();
    else
      config = config.MinimumLevel.Information();

    _logger = config.CreateLogger();

    Log.Logger = _logger;
  }
}