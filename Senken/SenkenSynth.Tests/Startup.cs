using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SenkenSynth.Tests.Startup))]
namespace SenkenSynth.Tests
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
