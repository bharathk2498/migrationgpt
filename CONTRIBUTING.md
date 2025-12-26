# Contributing to MigrationGPT

Thank you for your interest in contributing to MigrationGPT! This document provides guidelines for contributions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Clone repository
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install
```

## Code Style

### Python
- Follow PEP 8
- Use Black for formatting
- Use type hints
- Write docstrings

```bash
# Format code
black backend/

# Check style
flake8 backend/

# Type checking
mypy backend/
```

### JavaScript/React
- Follow Airbnb style guide
- Use ESLint
- Use Prettier for formatting

```bash
# Format code
npm run format

# Lint
npm run lint
```

## Testing

### Backend Tests
```bash
cd backend
pytest tests/ --cov
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Pull Request Process

1. Update README.md with details of changes if applicable
2. Update documentation in `/docs` if needed
3. Add tests for new features
4. Ensure all tests pass
5. Update CHANGELOG.md
6. Request review from maintainers

## Commit Messages

Use conventional commits:

```
feat: add new security scanner
fix: resolve parsing error for YAML files
docs: update API documentation
test: add tests for cost agent
refactor: improve infrastructure analyzer
```

## Feature Requests

Open an issue with:
- Clear description
- Use case
- Expected behavior
- Example if applicable

## Bug Reports

Include:
- Description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Logs/screenshots

## Areas for Contribution

### High Priority
- [ ] Multi-cloud support (Azure, GCP)
- [ ] Enhanced security scanning
- [ ] Performance optimizations
- [ ] Test coverage improvements

### Medium Priority
- [ ] Additional analyzers
- [ ] More AI agents
- [ ] UI/UX enhancements
- [ ] Documentation improvements

### Good First Issues
- [ ] Add more test cases
- [ ] Improve error messages
- [ ] Fix typos in documentation
- [ ] Add examples

## Code Review Guidelines

Reviewers will check for:
- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security considerations

## Questions?

Feel free to open an issue or reach out to:
- GitHub: [@bharathk2498](https://github.com/bharathk2498)
- Email: bharath@example.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
