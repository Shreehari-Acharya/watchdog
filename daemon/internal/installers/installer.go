package installers

type SecurityTools interface {
	Name() string
	Description() string
	Install() error   //package manager commands
	Configure() error //YAML config modifications
	Start() error     //installation entry point(systemctl)
}
